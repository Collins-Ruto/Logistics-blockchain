import "regenerator-runtime";
import React from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { login } from "./near/utils";
import getConfig from "./near/config";
import Supplier from "./pages/supplier/Supplier";
import Donors from "./pages/Donors/Donors";
import Manage from "./pages/components/Manage";
import Hospital from "./pages/hospitals/Hospital"
import Request from "./pages/hospitals/Request";
import Public from "./pages/public/public";
import Supply from "./pages/components/Supply";

export default function App() {
  const [showNotification, setShowNotification] = React.useState(false);
  const [supply, setSupply] = React.useState({});

  console.log(supply.title ? "true " +supply : "false");

  React.useEffect(() => {}, []);

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: "var(--secondary)",
              borderBottom: "2px solid var(--secondary)",
            }}
          >
            hello
          </label>
          ! Welcome to NEAR!center
        </h1>
        <p>
          Welcome to logistics on blockchain. To try it out, you need to sign in
          using the NEAR Wallet. It is very simple, just use the button below.
        </p>
        <p>
          Do not worry, this app runs in the test network ("testnet"). It works
          just like the main network ("mainnet"), but using NEAR Tokens that are
          only for testing!
        </p>
        <p style={{ textAlign: "center", marginTop: "2.5em" }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    );
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Public />}/>
        <Route exact path="/supplier" element={<Supplier supply={supply} setSupply={setSupply}/>}/>
        <Route exact path="/supply" element={<Supply supply={supply} />}/>
        <Route exact path="/donors" element={<Donors />}/>
        <Route exact path="/supplier/manage" element={<Manage />} />
        <Route exact path="/supplier" element={<Supplier />} />
        <Route exact path="/supplier/manage" element={<Manage />} />
        <Route exact path="/hospital" element={<Hospital />} />
        <Route exact path="/hospital/request" element={<Request />} />
      </Routes>
      {showNotification && <Notification />}
    </>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || "development");
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;

  return (
    <aside>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        " " /* React trims whitespace around tags; insert literal space character when needed */
      }
      called method: 'set_greeting' in contract:{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
