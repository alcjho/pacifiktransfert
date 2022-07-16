import React, { useState } from "react";
import Link from "next/link";

export default function MainBanner({ homeInfo }) {
  return (
    <div className="main-banner-section">
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
                  <form>
                    <div className="form-group">
                      <label>{homeInfo?.sender_input_label}</label>
                      <div className="money-transfer-field">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1,000"
                        />
                        <div className="amount-currency-select">
                          <div className="amount-currency-select">
                          <select tabIndex="-1" aria-disabled="true" style={{pointerEvents: 'none', touchAction: 'none'}}>
                            <option>CAD</option>
                          </select>
                        </div>
                        </div>
                      </div>
                    </div>

                    <div className="currency-info">
                      <div className="bar"></div>
                      <span>
                        <strong>{homeInfo?.exchange_rate_value}</strong>{" "}
                        {homeInfo?.exchange_rate_label}
                      </span>
                      <span>
                        <strong>${homeInfo?.transition_fee_value}</strong>{" "}
                         {homeInfo?.transition_fee_label}
                      </span>
                    </div>

                    <div className="form-group">
                      <label>{homeInfo?.recipient_label}</label>
                      <div className="money-transfer-field">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1,000"
                        />
                        <div className="amount-currency-select">
                          <select readOnly="readonly" tabIndex="-1" aria-disabled="true" style={{pointerEvents: 'none', touchAction: 'none'}}>
                            <option>XAF</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="money-transfer-info">
                      <span>
                        {homeInfo?.save_label}{" "}
                        <strong>1,010.32 USD {homeInfo?.save_value}</strong>
                      </span>
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
