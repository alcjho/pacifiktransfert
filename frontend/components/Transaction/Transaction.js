import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import moment from 'moment';
import Link from 'next/link';


const profile_info = {
    'name': 'Jhonny Alcius',
    'birth': '21/12/1998',
    'gender': 'male',
    'address': '2145 rue saint-germain, saint-laurent, H4L3T2, Canada',
    'occupation': '18',
    'email': 'luis.jhonny@gmail.com',
    'phone': '+5149556255'
}

export default function Transaction({ user }) {
    const [transactionHistory, setTransactionHistory] = useState([])
    
    async function getTransactionHistory(){
        const { data } = await axios.get(BACKEND_URL+'/api/user-transferts?filters[user][id][$eq]='+ user.id + '&sort=createdAt:DESC&populate=*', {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        });
        console.log(data.data)
        setTransactionHistory(data.data);
    }

    useEffect(() => {
        getTransactionHistory();
    }, [])


  return (
    <div>
        <div className="container rounded bg-white mt-5 mb-5 profile-page">
            <div className="row">
                <div className="col-md-2 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-3">
                        <img className="rounded-circle mt-5" width="150px" src={user.photo} />
                        <span className="font-weight-bold">{ user.firstname + ' ' + user.lastname  }</span>
                        <span className="text-black-50">{user.email}</span>
                        </div>
                </div>
                <div className="col-md-10 border-right mt-5">
                    <h4>Transactions</h4>
                    <div className="card my-5">
                        <div className="card-body p-4">
                            <h5 style={{display: 'inline-block'}} className="card-title mb-4">Toutes les transactions</h5>
                            <h6 style={{display: 'inline-block', float:'right'}} className="card-title mb-4"><Link href='/envoyer-argent'>Nouveau transfert</Link></h6>
                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr className='p-3'>
                                        <th>Date</th>
                                        <th>Destinataire</th>
                                        <th>Montant envoyé</th>
                                        <th>Montant reçu</th>
                                        <th>Type de transfert</th>
                                        <th>Statut</th>
                                        <th>Reçu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {transactionHistory?.map((transaction) => 
                                            <tr>
                                                <td>
                                                    <p className="fw-bold mb-1">{moment(transaction.attributes?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{transaction.attributes?.to_email}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{transaction.attributes?.amount_to_send}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{transaction.attributes?.amount_to_receive}</p>
                                                </td>
                                                <td>{transaction.attributes?.transfert_type.data?.attributes.name_fr}</td>
                                                <td>
                                                    {transaction.attributes?.status}
                                                </td>
                                                <td>
                                                    {transaction.attributes?.reception_proof?.data?.attributes?.url ?
                                                        <Zoom>
                                                            <img
                                                                style={{maxWidth: '100px'}}
                                                                src={BACKEND_URL + transaction.attributes?.reception_proof.data?.attributes?.url}
                                                                alt="no image"
                                                            />
                                                        </Zoom>
                                                        :
                                                        "Pas encore de reçu"
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
