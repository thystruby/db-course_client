import React from 'react';

const Accounts: React.FC = () => {
  return (
    <>
      <div className="flex mb-4">
        <div className="p-1 border mr-2">МТБанк</div>
        <div className="p-1 border mr-2">Приорбанк</div>
        <button className="p-1 bg-gray-200">Connect a bank</button>
      </div>

      <div className="text-lg font-bold">CARDS AND ACCOUNTS</div>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Cash</td>
            <td>57.71 BYN</td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>14.15 BYN</td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>550.57$</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { Accounts };