import React, { useState } from "react";

export const DOMTesting = () => {
  const [connect, setConnect] = useState("NO");

  return (
    <div data-testid="root">
      <h1>DOM Testing-Dem</h1>
      <div role="status-container">
        <label id="connect-status">Connect Status</label>
        <span title="Status" aria-labelledby="connect-status">
          Status:{connect}
        </span>
      </div>
      <button onClick={() => setConnect("YES")}>Connect</button>
    </div>
  );
};
