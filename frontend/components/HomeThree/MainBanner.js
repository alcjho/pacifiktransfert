import React, { useState } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { setCookie } from 'nookies';
import { useRouter } from 'next/router'
import { BACKEND_URL } from '../../config/constant';

export default function MainBanner({ homeInfo, admconfig }) {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const [senderValue, setSenderValue] = useState('')
  const [receiverValue, setReceiverValue] = useState('')
  const [userData, setUserData] = useState({
    send: '',
    receive: ''
})

  const updateAmount = (input) => {
    if (input === 'sender') {
      setReceiverValue(Number(senderValue) * Number(admconfig.exchange_rate))
    }
    else {
      setSenderValue(Number(receiverValue) / Number(admconfig.exchange_rate))
    }
  }

  const onSubmit = async (e) => {
    // e?.preventDefault();
    setCookie(null, 'send', senderValue);
    setCookie(null, 'receive', receiverValue);

    try {
        router.replace('/envoyer-argent');
    } catch (err) {
        console.log(err.response);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
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

                  {/* <Link href="/about-us">
                    <a className="btn btn-primary">
                      Learn More{homeInfo?.more_btn}
                    </a>
                  </Link> */}
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="money-transfer-form">
                  <form id="moneyForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>{homeInfo?.sender_input_label}</label>
                      <div className="money-transfer-field">
                        <input
                          type="text"
                          name="send_amount"
                          ref={register({ required: true, max: 1000, min: 1 })}
                          className="form-control"
                          placeholder="1,000"
                          value={Number(senderValue)}
                          onChange={(e)=> setSenderValue(e.target.value)}
                          onBlur={()=> updateAmount('sender')}
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
                        {errors.send_amount && errors.send_amount.type === "max" && 'maximum 1000$'}
                        {errors.send_amount && errors.send_amount.type === "min" && 'min 10$'}
                    </div>

                    <div className="currency-info">
                      <div className="bar"></div>
                      <span>
                        <strong>{homeInfo?.exchange_rate_value}</strong>{" "}
                        {admconfig?.default_sender_exchange_rate}
                      </span>
                      {/* <span>
                        <strong>${homeInfo?.transition_fee_value}</strong>{" "}
                         {homeInfo?.transition_fee_label}
                      </span> */}
                    </div>

                    <div className="form-group">
                      <label>{homeInfo?.recipient_label}</label>
                      <div className="money-transfer-field">
                        <input
                          type="text"
                          name="receive"
                          className="form-control"
                          placeholder="1,000"
                          value={Number(receiverValue)}
                          onChange={(e)=> {
                            setReceiverValue(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={() => updateAmount('receiver')}
                        />
                        <div className="amount-currency-select">
                          <select readOnly="readonly" tabIndex="-1" aria-disabled="true" style={{pointerEvents: 'none', touchAction: 'none'}}>
                            <option>{admconfig?.default_receiver_currency}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* <div className="money-transfer-info">
                      <span>
                        {homeInfo?.save_label}{" "}
                        <strong>1,010.32 USD {homeInfo?.save_value}</strong>
                      </span>
                    </div> */}

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
