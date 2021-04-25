import React, { useEffect, useState, useRef } from 'react';


function AppInput({ rezult, setRezult }) {
    const inputAmountRef = useRef(null);

    // Step first - create state for whole form
    const [state, setState] = useState({
        // object which will contain numeric relations between values
        currencyMap: {},
        // array of string which represents currency abbreviation: USD, BTC - for display in select's
        currencies: [],
        // I didn't know for what exists this variable
        // i leave here if u need
        count: 0,
        fromCurrency: '',
        toCurrency: '',
        money: 0,
    })

    useEffect(() => {
       doApi();
       // TODO: maybe we should call api when from currency changes (according to JSON)
    }, [rezult])

    const doApi = async () => {
        try {
            let url = "/money.json";
            let resp = await fetch(url);
            let data = await resp.json();


            const allCurrenciesAbbreviations = [];
            const currencyRelationsMap = {}
            Object.entries(data.quotes).forEach(([key, value]) => {
                // extract all names of currences
                const currentCurrency = key.substring(0, 3);  // USDBTC => USD
                const currencyAbrv = key.substring(3); // USDBTC => BTC

                // save all currences
                allCurrenciesAbbreviations.push(currencyAbrv);

                // USDBTC: one dollar costs {value}
                currencyRelationsMap[key] = value;
                // create reverse map - when we swap currencies then - we have BTCUSD
                // so one bitcoin costs 1 dollar / {value}
                currencyRelationsMap[currencyAbrv + currentCurrency] = 1 / value;
            })

            // merge prevstate with new parameters
            setState(prevState => ({
                ...prevState,
                currencies: allCurrenciesAbbreviations,
                currencyMap: currencyRelationsMap,
                // TODO: need check array size
                fromCurrency: allCurrenciesAbbreviations[0],
                toCurrency: allCurrenciesAbbreviations[1]
            }))
        }
        catch (err) {
        }
    }


    /**
     * @param amount is money in current currency ({@link state.fromCurrency}
     */
    const changeMoney = (amount = '') => {
       setState(prevState => {
           // create new state based on previous state
           const keyOfRelation = prevState.fromCurrency + prevState.toCurrency; // USD + BTC = USDBTC
           let money = prevState.money;
           money = Number.parseFloat(amount) * prevState.currencyMap[keyOfRelation]
           // if money can't be counted
           if (isNaN(money)) {
               return prevState;
           }
           // return the new state
           return {
                ...prevState,
                money
           };
       })
      // let moneyg=money/amount;

    }

    const swapCurrencies = (e) => {
        e.preventDefault()
        setState(prevState => ({
            ...prevState,
            fromCurrency: state.toCurrency,
            toCurrency: state.fromCurrency,
        }))
    }

    const onChangeHandler = ({ target: { name, value }}) => {
        setState(prevState => ({
            ...prevState,
            // dynamic property accessor
            [name]: value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        changeMoney(inputAmountRef.current.value)
    }
    // WARN!!! if we try to use convertor with no usd param: BTC - ILS -> an error can be thrown

    return (
        <div>
            <h1>Exchange</h1>
        <div className="container my-5 ">
            <div className="row">
                <div className=" col-lg-8">
                    <div className="card card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <form id="from"  className=" mb-4" onSubmit={onSubmit}>
                                    <h4>Insert amount:</h4>
                                    <input
                                      type="number"
                                      name="amount"
                                      className="form-control form-control-lg "
                                      defaultValue="1"
                                      ref={inputAmountRef}
                                    />
                                    <br/>
                                    <h4>From:</h4>
                                    <select name="fromCurrency" className="form-control form-control-lg" onChange={onChangeHandler} value={state.fromCurrency} >
                                        <option value="">Select currency</option>
                                        {state.currencies.map(currencyName => (
                                          <option key={currencyName} value={currencyName}>{currencyName}</option>
                                        ))}
                                    </select>

                                    <br/>
                                    <button onClick={swapCurrencies}  className="swap">  &#8595; &#8593; </button>
                                    
                                     <h4>To:</h4>
                                    <select id="to" name="toCurrency" className="form-control form-control-lg" onChange={onChangeHandler} value={state.toCurrency}>
                                        <option value="">Select currency</option>
                                        {state.currencies.map(currencyName => (
                                          <option key={currencyName} value={currencyName} >{currencyName}</option>
                                        ))}
                                    </select>
                                    
                                    <button  className="btn btn-danger  d-block mt-3">convert</button>
                                    <h2>{state.money.toFixed(4)} {state.toCurrency}</h2>
                                </form>
                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}

export default AppInput