import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const profile_info = {
    'name': 'Jhonny Alcius',
    'birth': '21/12/1998',
    'gender': 'male',
    'address': '2145 rue saint-germain, saint-laurent, H4L3T2, Canada',
    'occupation': '18',
    'email': 'luis.jhonny@gmail.com',
    'phone': '+5149556255'
}

const transactions = [{
    'date': '31/12/1991',
    'description': 'send to cameroun',
    'status': 'active',
    'amount': '100'
}, {
    'date': '31/12/1991',
    'description': 'send to cameroun',
    'status': 'active',
    'amount': '50'
},{
    'date': '31/12/1991',
    'description': 'send to cameroun',
    'status': 'done',
    'amount': '1000'
}]

export default function Transaction() {
    const [transactionHistory, setTransactionHistory] = useState(transactions)

    
  return (
    <div>
        <div className="container rounded bg-white mt-5 mb-5 profile-page">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-3">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                        <span className="font-weight-bold">{profile_info.name}</span>
                        <span className="text-black-50">{profile_info.email}</span>
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
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Montant</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {transactionHistory.map((transaction) => 
                                            <tr>
                                                <td>
                                                    <p className="fw-bold mb-1">{transaction.date}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{transaction.description}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{transaction.status}</p>
                                                </td>
                                                <td>{transaction.amount}</td>
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
