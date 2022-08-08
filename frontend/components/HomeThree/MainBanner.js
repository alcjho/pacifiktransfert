import React, { useState } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { BACKEND_URL } from '../../config/constant';
import calculateFees from '../../components/Rates/calculate';

export default function MainBanner({ homeInfo, admconfig, trxTypes}) {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const [senderValue, setSenderValue] = useState('')
  const [receiverValue, setReceiverValue] = useState('')
  const [transfertType, setTransfertType] = useState('');
  const [userData, setUserData] = useState({
    send: '',
    receive: ''
})

  const updateAmount = (value, input) => {
    if (input === 'sender') {
      setReceiverValue(calculateFees(value, admconfig.exchange_rate));
    }
    else {
      setSenderValue(calculateFees(value, admconfig.exchange_rate, true));
    }
  }

  const onSubmit = async (e) => {
    try {
        router.replace(`/envoyer-argent?send=${senderValue}&trxtype=${transfertType}`);
    } catch (err) {
        console.log(err.response);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(e.target.name == 'send'){
      setSenderValue(value)
      updateAmount(value, 'sender');
    }else if(e.target.name == 'receive'){
      setReceiverValue(value)
      updateAmount(value, 'receiver');
    }
    setUserData({...userData, [name]: value });
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: [value] });
  }

  return (
    <div className="main-banner-section" style={{backgroundImage: `url(` + BACKEND_URL + homeInfo.Carousel?.data[0]?.attributes?.url + `)`}}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12">
                <div className="banner-content">
                  <h1>
                    {homeInfo?.title}
                  </h1>
                  <p>
                    {homeInfo?.description}
                  </p>
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="money-transfer-form">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-5">
                      <label>Choisissez un type de transfert</label>
                      <div className="money-transfer-field">
                          <select 
                            required={true}
                            name="transfert_type"
                            style={{color: '#000000'}}
                            ref={register({ required: true })}
                            className="form-control" 
                            onChange={(e)=> {handleSelectChange(e); setTransfertType(e.target.value)}}
                          >
                            <option value="">Type de transfert</option>
                            {trxTypes?.map((trxType) => 
                                <option value={trxType.value}>{trxType.label}</option>
                              )
                            }
                          </select>
                      </div>
                    </div>
                    <div className='invalid-feedback' style={{display: 'block'}}>
                        {errors.transfert_type && errors.transfert_type.type === "required"  && 'Choisissez un type de transfert'}
                    </div>
                    <div className="form-group">
                      <label>{homeInfo?.sender_input_label}</label>
                      <div className="send-amount-field">
                        <input
                          type="number"
                          name="send"
                          ref={register({ required: true, min: admconfig?.min_sender_money?admconfig.min_sender_money:10, max: admconfig?.max_sender_money?admconfig?.max_sender_money:1000 })}
                          className="form-control"
                          placeholder={"Maximum "+admconfig?.max_sender_money+" "+admconfig?.default_sender_currency}
                          value={senderValue}
                          onChange={(e)=> handleChange(e)}
                        />
                        <div className="amount-currency-select">
                          <div className="amount-currency-select">
                          <select tabIndex="-1" aria-disabled="true" style={{pointerEvents: 'none', touchAction: 'none'}}>
                            <option>{admconfig?.default_sender_currency}</option>
                          </select>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className='invalid-feedback' style={{display: 'block'}}>
                        {errors.send_amount && errors.send_amount.type === "required"  && 'entrer le montant à envoyer'}
                        {errors.send_amount && errors.send_amount.type === "max" && `maximum ${admconfig?.max_sender_money?admconfig.max_sender_money:1000} CAD`}
                        {errors.send_amount && errors.send_amount.type === "min" && `minimum  ${admconfig?.min_sender_money?admconfig.min_sender_money:10} CAD`}
                    </div>

                    <div className="currency-info">
                      <div className="bar"></div>
                      <span>
                        {homeInfo?.exchange_rate_label} : <strong>{admconfig?.exchange_rate}</strong>{" "}
                        
                      </span>
                    </div>

                    <div className="form-group">
                      <label>{homeInfo?.recipient_label}</label>
                      <div className="money-transfer-field">
                        <input
                          type="number"
                          name="receive"
                          className="form-control"
                          value={receiverValue}
                          onChange={(e)=> handleChange(e)}
                        />
                        <div className="amount-currency-select">
                          <select readOnly="readonly" tabIndex="-1" aria-disabled="true" style={{pointerEvents: 'none', touchAction: 'none'}}>
                            <option>{admconfig?.default_receiver_currency}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {homeInfo?.cta_label}
                    </button>

                    <div className="terms-info">
                      <p>
                    
                        {homeInfo?.cta_description}{" "}
                        <Link href="/terms-policy">
                          <a>{homeInfo?.terms_policy}</a>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
