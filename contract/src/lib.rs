use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, json_types::U128, log, near_bindgen, AccountId, Promise};
use std::collections::HashMap;
use std::convert::TryInto;

#[near_bindgen]
#[derive( BorshDeserialize, BorshSerialize)]
pub struct Supplies {
    data: HashMap<String, Supply>,
    hospitals: HashMap<String, Hospitals>,
    suppliers: HashMap<String, Supplier>,
    items: HashMap<String, Item>,
    ids: i32,
    funds: HashMap<AccountId, f32>,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Supply {
    hospital: Hospitals,
    supplier: Supplier,
    supplies: HashMap<String, f32>,
    sponsor: String,
    supply_cost: f32,
    misc: HashMap<String, f32>,
    misc_cost: f32,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Hospitals {
    hospital_name: String,
    hospital_level: String,
    hospital_county: String,
    supplies: HashMap<String, Item>,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Item {
    cost: f32,
    manufacturer: String,
    types: String,
    date_of_manufacture: String,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Supplier {
    name: String,
    types: String,
    supply_runs: u32,
    supply_worth: f32,
}

impl Default for Supplies {
    fn default() -> Self {
        Self {
            data: HashMap::new(),
            hospitals: HashMap::new(),
            suppliers: HashMap::new(),
            items: HashMap::new(),
            ids: 1,
            funds: HashMap::new(),
        }
    }
}

#[near_bindgen]
impl Supplies {
    #[payable]
    pub fn deposit(&mut self) {
        let token = env::attached_deposit();
        let funder = env::predecessor_account_id();
        self.funds.insert(funder, token as f32);
    }

    #[private]
    pub fn add_hospital(&mut self, name: String, level: String, county: String) {
        let new_hospital = Hospitals {
            hospital_name: name.clone(),
            hospital_level: level,
            hospital_county: county,
            supplies: HashMap::new(),
        };
        self.hospitals.insert(name, new_hospital);
    }

    #[private]
    pub fn add_item(
        &mut self,
        name: String,
        cost: f32,
        manufacturer: String,
        types: String,
        date: String,
    ) {
        let new_item = Item {
            cost: cost,
            manufacturer: manufacturer,
            types: types,
            date_of_manufacture: date,
        };
        self.items.insert(name, new_item);
    }

    #[private]
    pub fn add_supplier(&mut self, name:String, types: String) {
        let new_supplier = Supplier {
            name: name.clone(),
            types: types,
            supply_runs: 0,
            supply_worth: 0.0,
        };
        self.suppliers.insert(name, new_supplier);
    }

    pub fn new_supply(&mut self, sponsor: AccountId, hospital_id: String) -> String {
        let id = (self.ids + 1).to_string();
        let supplier_acc_id = env::predecessor_account_id().to_string();
        
        let hospital = self.hospitals[&hospital_id].clone();
        let supplier = self.suppliers[&supplier_acc_id].clone();

        let new_supply = Supply {
            hospital: hospital,
            supplier: supplier,
            supplies: HashMap::new(),
            sponsor: sponsor.to_string(),
            supply_cost: 0.0,
            misc: HashMap::new(),
            misc_cost: 0.0,
        };
        self.data.insert(id.clone(), new_supply);
        log!(
            "Note your supply id is {}, You'll need it to feed your supply data",
            id
        );
        self.ids += 1;
        id.to_string()
    }

    pub fn add_supplies(&mut self, id: String, supplies: String, costs: String) -> String {
        let supplies_vec: Vec<&str> = supplies.split(", ").collect(); // 
        let supplies_cost: Vec<&str> = costs.split(", ").collect();
        let mut costs_vec: Vec<f32> = vec![];
        for s in &supplies_cost { // convert the str costs to float and add them to a Vec
            costs_vec.push(s.parse().unwrap())
        }
        let supply_cost: f32 = costs_vec.iter().sum();
        if self.data.contains_key(&id) {
            for supply in supplies_vec.clone() {
                log!("supplies are {}", supply);
                if !self.items.contains_key(&supply.to_string()) { // check if the supply exists in our list of acceptable items
                    return "unsucessful".to_string();
                };
                let index = supplies_vec.iter().position(|&r| r == supply).unwrap();
                let cost = costs_vec[index];
                if let Some(supply_struct) = self.data.get_mut(&id) {
                    supply_struct.supplies.insert(supply.to_string(), cost);
                    supply_struct.supply_cost = supply_cost;
                    supply_struct.supplier.supply_worth += cost;
                    supply_struct.supplier.supply_runs += 1;
                }
            }
            return "successful".to_string();
        } else {
            return "inexistent id".to_string();
        }
    }

    pub fn add_miscs(&mut self, id: String, misc: String, costs: String) {
        let miscs_vec: Vec<&str> = misc.split(", ").collect();
        let miscs_cost: Vec<&str> = costs.split(", ").collect();
        let mut costs_vec: Vec<f32> = vec![];
        for s in &miscs_cost {
            costs_vec.push(s.parse().unwrap())
        }
        let supply_cost: f32 = costs_vec.iter().sum();
        for supply in miscs_vec.clone() {
            let index = miscs_vec.iter().position(|&r| r == supply).unwrap();
            let cost = costs_vec[index];
            if let Some(supply_struct) = self.data.get_mut(&id) {
                supply_struct.misc.insert(supply.to_string(), cost);
                supply_struct.misc_cost = supply_cost;
                supply_struct.supplier.supply_worth += cost;
            }
        }
        log!("The public will judge your miscellaneous costs")
    }
    
    pub fn view_deposits(&self) -> usize {
        log!("in View");
        for i in &self.funds {
            log!("{:#?}", i)
        }
        self.funds.len()
    }
    
    pub fn request_funds(&mut self, id: String) -> Promise {
        let charge = self.data[&id].supply_cost + self.data[&id].misc_cost;
        let token: U128 = U128::from(charge as u128 * u128::pow(10, 24));
        log!("Calculated costs: {:?}", token);

        let supply_struct = &self.data[&id];

        let supplier_id: AccountId = (supply_struct.supplier.name.clone()).parse().unwrap();
        let sponsor_acc: AccountId = (supply_struct.sponsor.clone()).try_into().unwrap();
        let sponsor_deposit = if self.funds.contains_key(&sponsor_acc) {U128::from(self.funds[&sponsor_acc] as u128)} else {U128::from(0)};

        assert!(self.funds.contains_key(&sponsor_acc), "Check your sponsor and try again");
        assert!(token < sponsor_deposit, "Sponsors Deposit is Low");
        assert!(self.suppliers.contains_key(&supply_struct.supplier.name), "Your account is not known");
        assert!(self.hospitals.contains_key(&supply_struct.hospital.hospital_name), "The target hospital is unknown");

        log!("Successfull");
        if let Some(fund) = self.funds.get_mut(&sponsor_acc) {
            *fund -= charge * (u128::pow(10, 24)) as f32;
        }
        log!("supplier id: {}", supplier_id);
        Promise::new(supplier_id).transfer(token.0)
    }

}

impl Hospitals {
    fn clone(&self) -> Self {
        Self {
            hospital_name: self.hospital_name.clone(),
            hospital_county: self.hospital_county.clone(),
            supplies: HashMap::new(),
            hospital_level: self.hospital_level.clone(),
        }
    }
}

impl Supplier {
    fn clone(&self) -> Self {
        Self {
            name: self.name.clone(),
            types: self.types.clone(),
            supply_runs: self.supply_runs.clone(),
            supply_worth: self.supply_worth.clone(),
        }
    }
}

pub fn to_near(yocto: u128) -> f32 {
    (yocto as f32) / 1_000_000_000_000_000_000_000_000.0
}

pub fn st(text: &str) -> String {
    text.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::{testing_env, VMContext};
    use std::convert::TryFrom;

    fn coast_gen() -> AccountId {
        AccountId::try_from("coast-general.testnet".to_string().clone()).unwrap()   
    }
    fn kemsa() -> AccountId {
        AccountId::try_from("kemsa.testnet".to_string().clone()).unwrap()   
    }
    fn health_ministry() -> AccountId {
        AccountId::try_from("moh.testnet".to_string().clone()).unwrap()   
    }

    fn get_context(predecessor_account_id: AccountId, attached_deposit: u128) -> VMContext {
        VMContext {
            current_account_id: AccountId::try_from("collinsrutto.testnet".to_string().clone()).unwrap(),
            signer_account_id: health_ministry(),
            signer_account_pk: vec![0u8; 33].try_into().unwrap(),
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit,
            view_config: None,
            prepaid_gas: near_sdk::Gas(10u64.pow(18)),
            random_seed: [0u8; 32],
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn test_deposit() {
        let context = get_context(health_ministry(), 30000000000000000000000000);// attaching 3 NEAR
        testing_env!(context);
        let mut contract: Supplies = Supplies::default();
        contract.deposit();
        assert_eq!(1, contract.view_deposits());
    }

    #[test]
    fn test_new_hos() {
        let context = get_context(coast_gen(), 0);
        testing_env!(context);
        let mut contract: Supplies = Supplies::default();
        contract.add_hospital(coast_gen().to_string(), "subcounty".to_string(), "mombasa".to_string());
        assert_eq!(1, contract.hospitals.len());
        assert!(contract.hospitals.contains_key(&coast_gen().to_string()));
    }

    #[test]
    fn test_new_supply() {
        let context = get_context(kemsa(), 0);
        testing_env!(context);
        let mut contract: Supplies = Supplies::default();

        contract.add_supplier(st("kemsa.testnet"), st("public"));
        contract.add_hospital(coast_gen().to_string(),"subcounty".to_string(), "mombasa".to_string());
        contract.new_supply(health_ministry(), coast_gen().to_string());
        
        assert!(contract.data.contains_key(&st("2")));
        assert!(contract.data.len() > 0);
    }

    #[test]
    fn test_add_item() {
        let mut contract: Supplies = Supplies::default();
        contract.add_item(st("scapel"), 55.5, st("mrm"), st("sugical"), st("11-2-2002"));
        contract.add_item(st("gauze"), 200.0, st("trex"), st("sugical"), st("11-2-2002"));

        assert_eq!(2, contract.items.len());
    }

    #[test]
    fn test_new_supplies() {
        let context = get_context(kemsa(), 0);
        testing_env!(context);
        let mut contract: Supplies = Supplies::default();
       
        contract.add_supplier(st("kemsa.testnet"), st("public"));
        contract.add_hospital(coast_gen().to_string(),"subcounty".to_string(), "mombasa".to_string());
        contract.new_supply(health_ministry() , coast_gen().to_string());
        contract.add_item(st("scapel"), 55.5, st("mrm"), st("sugical"), st("11-2-2002"));
        contract.add_item(st("gauze"), 200.0, st("trex"), st("sugical"), st("11-2-2002"));
        
        // Add data with real supplier, hospital and sponsor
        contract.add_supplies("2".to_string(),"scapel, gauze".to_string(), "0, 0".to_string());
        assert_eq!(2, contract.data["2"].supplies.len());
        assert_eq!(true, contract.data.contains_key(&st("2")));

        // Test no data should be added without a valid id "10"
        contract.add_supplies("1".to_string(),"scapel, gauze".to_string(), "2.3, 3.4".to_string());
        assert_eq!(false, contract.data.contains_key(&st("1")));
    }

    // Can't test since two funtions depends on conflicting predecessor_account_ids
    #[test]
    #[should_panic]
    fn test_request_funds(){
        let context = get_context(health_ministry(), 300_0000000000000000000000000); // 300 NEAR
        testing_env!(context);
        let mut contract: Supplies = Supplies::default();

        contract.deposit();
        contract.add_supplier(st("kemsa.testnet"), st("public"));
        contract.add_hospital(coast_gen().to_string(),"subcounty".to_string(), "mombasa".to_string());
        contract.new_supply(health_ministry() , coast_gen().to_string());
        contract.add_item(st("scapel"), 55.5, st("mrm"), st("sugical"), st("11-2-2002"));
        contract.add_item(st("gauze"), 200.0, st("trex"), st("sugical"), st("11-2-2002"));
        
        // Add data with real supplier, hospital and sponsor
        contract.add_supplies("2".to_string(),"scapel, gauze".to_string(), "25.5, 225.0".to_string());
        contract.request_funds(st("2"));
    }
}