import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant'

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
        const { data } = await axios.get(BACKEND_URL+'/api/user-transferts?filters[user][id][$eq]=22&populate=*', {
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
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-3">
                        <img className="rounded-circle mt-5" width="150px" src={user.photo} />
                        <span className="font-weight-bold">{ user.firstname + ' ' + user.lastname  }</span>
                        <span className="text-black-50">{user.email}</span>
                        </div>
                </div>
                <div className="col-md-9 border-right mt-5">
                    <h4>Transactions</h4>
                    <div className="card my-5">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Toutes les transactions</h5>

                            <table className="table align-middle mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr className='p-3'>
                                        <th>Date</th>
                                        <th>Destinataire</th>
                                        <th>Montant envoye</th>
                                        <th>Montant recu</th>
                                        <th>type de transfert</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {transactionHistory?.map((transaction) => 
                                            <tr>
                                                <td>
                                                    <p className="fw-bold mb-1">{transaction.attributes?.createdAt}</p>
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
                                                    <button type="button" className="btn btn-link btn-sm btn-rounded">
                                                       Edit
                                                    </button>
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
