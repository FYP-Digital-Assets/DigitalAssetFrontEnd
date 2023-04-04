// images imports
import ledger from "../assets/ledger-icon.png"
import metamask_icon from "../assets/metamask-icon.svg"
import Phantom from "../assets/Phantom.svg"

import "../modal.css"

const Modal = (props)=>{
    // wallets options
    const walletList = [];
    walletList.push({name:"Metamask", icon:metamask_icon});
    walletList.push({name:"Ledger", icon:ledger});
    walletList.push({name:"Phantom", icon:Phantom});
    walletList.push({name:"Core", icon:Phantom});   
    return (
        // modal
        // porps.close_reference_modal: = is reference use to update modal in code
        // props.close_modal is the method that close the modal using reference 
        <div className="modal-container_1"  ref={props.close_reference_modal} >
            <div>
                <div>
                    {/* header of modal */}
                    <div className="modal_header">
                        <div>
                            <button className="btn-modal-close" onClick={props.close_modal} >&times;</button>
                        </div>
                        
                        <h4 className="body-text-bold" align="center">Connect your Wallet</h4>
                        <p align="center">if you don't have a wallet, select one provider to create an account.</p>
                    </div>
                    {/* body of Modal */}
                    <div className="modal-body-wallets">
                        <div>
                        
                            {walletList.map((wallet, i)=>{
                                return (
                                    // each row of modal body
                                    <div className="modal_table_row" key={i} onClick={props.ConnectToWallet} >
                                        <div className="modal_wallet_img">{<img src={wallet.icon}/>}</div>
                                        <div>{wallet.name}</div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                    {/* fotter of modal */}
                    <div >
                        <p align="center"></p>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default Modal ;