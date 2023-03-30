export function WalletConnectModal(){
    const walletList = [];
    walletList.push({name:"Metamask", icon:""});
    walletList.push({name:"Ledger", icon:""});
    walletList.push({name:"Phantom", icon:""});
    walletList.push({name:"Core", icon:""});
    return ( 
      <div className="modal fade" id="walletConnect" role="dialog">
    <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title" align="center">Connect Wallet</h4>
      </div>
      <div className="modal-body">
        <table align="center" width="80%"
        height="250rem" >
          <tbody>
           {walletList.map((wallet, i)=>{
            return (<tr key={i}>
              <td>{<img src={wallet.icon} />}</td>
              <td>{wallet.name}</td>
            </tr>);
           })}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        This is footer
      </div>
    </div>
    
  </div>
  </div>
  );
  }