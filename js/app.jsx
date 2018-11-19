import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

document.addEventListener('DOMContentLoaded', function(){


	class App extends React.Component {
		
		render(){
			return (
				<div>
					<HashRouter>
					<Switch>
						<Route exact path='/' component={SignIn} />
						<Route path='/register' component={SignUp} />
						<Route path='/main/:userName' component={Main} />
						<Route component={NotFound} />
					</Switch>
					</HashRouter>
				</div>
			)
		}
	}


	class SignIn extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				login: '',
				password: '',
				showAlert: false,
				showAlert2: false
			};
		}

		checkLogin = () => {
			let status = false;
			for (let i=0; i<localStorage.length; i++) {
				if (this.state.login == localStorage.key(i)) {
					let user = JSON.parse(localStorage.getItem(this.state.login));
					if(this.state.password == user.password) {
						status = true;
					}
				}
			}
			return status;
		}
		
		handleLogin = (event) => {
			this.setState({login: event.currentTarget.value});
		};

		handlePassword = (event) => {
			this.setState({password: event.currentTarget.value});
		};

		handleSignIn = (event) => {
			event.preventDefault();
			let status = true;
			if (this.state.login.length == 0) {
				status = false;
			};
			if (this.state.password.length == 0) {
				status = false;
			};
			if (status) {
				this.setState({
					showAlert: false
				})
				if (this.checkLogin()) {
					location.href=`#/main/${this.state.login}`;
					this.setState({
						showAlert2: false
					})
				} else {
					this.setState({
						showAlert2: true
					})
				}
			} else {
				this.setState({
					showAlert: true,
					showAlert2: false
				})
			}
		};

		render(){
			return (
				<div className="container">
					<header>
						<p className="header">New?</p>
						<Link to="/register" className="header">Sign up</Link>
					</header>
					<main className="mainSignin">
					<h1 className="title">Stock Exchange Simulator </h1>
						<h1 className="title">Please sign in</h1>
						<form className="form" onSubmit={this.handleSignIn}> 
						{/* <form onsubmit="alert(this.tekst.value); return false" action="#/register">  */}
								<input type="text" className="inputSingin" placeholder="user name"
									value={this.state.login}
									onChange={this.handleLogin}
								/>
								<div  className={(this.state.showAlert && this.state.login.length == 0) ? "alert" : "nonActive"}>!    Enter login</div>

								<input type="password" className="inputSingin"  placeholder="password"
									value={this.state.password}
									onChange={this.handlePassword}
								/>
								<div className={(this.state.showAlert && this.state.password.length == 0) ? "alert" : "nonActive"}>!    Enter password</div>

							<input className="buttonSignIn" type="submit" value="Sign in" />
						</form>
						<div  className={(this.state.showAlert2) ? "inputSingin alert2" : "nonActive"}>
							Sorry, but the username and password you provided don't match. Please check them and try again.
						</div>
					</main>
				</div>
			)
		}
	}


	class SignUp extends React.Component {

		returnData = (data) => {
			localStorage.setItem(data.login, JSON.stringify(data));
			setTimeout("location.href='#/';",1000);	
		}

		render(){
			return (
				<div className="container">
					<header>
						<p className="header">Already have an account?</p>
                  <Link to="/" className="header">Sign in</Link>
					</header>
					<main className="mainSignup">
						<h1>Create account</h1>
						<SignUpForms 
								firstName={''}
								lastName={''}
								login={''}
								password={''}
								repassword={''}
								ballance={0}
								fp={0}
								fpl={0}
								pgb={0}
								fpc={0}
								fpa={0}
								dl24={0}
								edit={false}
								returnData={this.returnData}
								buttonText={'Create new account'}
						/>
					</main>
				</div>
			)
		}
	}


	class SignUpForms extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				login: this.props.login,
				password: this.props.password,
				repassword: this.props.password,
				ballance: this.props.ballance,
				fp: this.props.fp,
				fpl: this.props.fpl,
				pgb: this.props.pgb,
				fpc: this.props.fpc,
				fpa: this.props.fpa,
				dl24: this.props.dl24,
				showAlert: false
			};
		}

		handleLogin = (event) => {
			this.setState({
				login: event.currentTarget.value
			});
		};

		handlePassword = (event) => {
			this.setState({
				password: event.currentTarget.value
			});
		};

		handleRepassword = (event) => {
			this.setState({repassword: event.currentTarget.value});
		};

		handleFirstName =  (event) => {
			this.setState({
				firstName: event.currentTarget.value
			});
		};
		
		handleLastName =  (event) => {
			this.setState({
				lastName: event.currentTarget.value
			});
		};

		handleBallance = (event) => {
			this.setState({
				ballance: event.currentTarget.value
			});
		};

		handleFp = (event) => {
			this.setState({
				fp: event.currentTarget.value
			});
		};

		handleFpl = (event) => {
			this.setState({
				fpl: event.currentTarget.value
			});
		};

		handlePgb = (event) => {
			this.setState({
				pgb: event.currentTarget.value
			});
		};

		handleFpc = (event) => {
			this.setState({
				fpc: event.currentTarget.value
			});
		};

		handleFpa = (event) => {
			this.setState({
				fpa: event.currentTarget.value
			});
		};

		handleDl24 = (event) => {
			this.setState({
				dl24: event.currentTarget.value
			});
		};

		checkLogin = (login) => {
			let status = false;
			for (let i=0; i<localStorage.length;i++) {
				if (localStorage.key(i) == this.state.login) {
					status = true;
				}
			}
			return status;
		}

		handleRemoveAccount = () => {
			if ( typeof this.props.removeAccount === 'function' ){
				this.props.removeAccount();
			}
			
		}

		handleCancel = () => {
			if ( typeof this.props.closeWindow === 'function' ){
				this.props.closeWindow();
			}
		}

		handleSaveCreate = () => {
			let status = true;
			if (this.state.login.length == 0) {
				status = false;
			};
			if ((this.checkLogin()) && (!this.props.edit)) {
				status = false;
			};
			if (this.state.password.length < 6) {
				status = false;
			};
			if (this.state.password !== this.state.repassword) {
				status = false;
			};
			if (this.state.firstName.length == 0) {
				status = false;
			};
			if (this.state.lastName.length == 0) {
				status = false;
			};
			if (status) {
				this.setState({
					showAlert: false
				})
				let data = {
					login: this.state.login,
					password: this.state.password,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					ballance: this.state.ballance,
					fp: this.state.fp,
					fpl: this.state.fpl,
					pgb: this.state.pgb,
					fpc: this.state.fpc,
					fpa: this.state.fpa,
					dl24: this.state.dl24
				}; 
				if ( typeof this.props.returnData === 'function' ){
					this.props.returnData(data);
				};
			} else {
				this.setState({
					showAlert: true
				})
			}
		};

		render() {
			let inputLogin;
			let buttons;
			if (this.props.edit) {
				inputLogin= 
					<input type="text" id="login" className="inputSingup" disabled="disabled"
								value={this.state.login}
								onChange={this.handleLogin}
					/>;
				buttons= 
					<div className="signUpForms">
						<button onClick={this.handleRemoveAccount} className="buttonCancelRemove">Remove account</button>
						<button onClick={this.handleCancel} className="buttonCancelRemove">Cancel</button>
						<button onClick={this.handleSaveCreate} className="buttonCancelRemove">{this.props.buttonText}</button>
					</div>;
			} else {
				inputLogin= 
					<input type="text" id="login" className="inputSingup"
								value={this.state.login}
								onChange={this.handleLogin}
					/>;
				buttons=
				<button onClick={this.handleSaveCreate} className="buttonSignUp">{this.props.buttonText}</button>;
			}

			return(
				<div className="formContainer">
					<div className="signUpForms">
						<section>
							<h3 className="">Account information</h3>
							<form className="form">
								<label className="label">Login</label>
								{inputLogin}
								<div className={(this.state.showAlert && this.state.login.length == 0) ? "alert" : "alert nonActive"}>!    Enter login</div>
								<div className={(this.state.showAlert && (this).checkLogin() && (!this.props.edit)) ? "alert" : "alert nonActive"}>!    Login already in use</div>
							</form>
							<form className="form">
								<label className="label">Password</label>
								<input type="password" className="inputSingup"  placeholder="At least 6 character"
									value={this.state.password}
									onChange={this.handlePassword}
								/>
								<div className={(this.state.showAlert && this.state.password.length < 6) ? "alert" : "alert nonActive"}>!    Passwords must be at least 6 characters</div>
							</form>
							<form className="form">
								<label className="label">Re-enter password</label>
								<input type="password" className="inputSingup"
									value={this.state.repassword}
									onChange={this.handleRepassword}
								/>
								<div className={(this.state.showAlert && this.state.password !== this.state.repassword) ? "alert" : "alert nonActive"}>!    Passwords must match</div>
							</form>

							<h3 className="">Personal information</h3>
							<form className="form">
								<label className="label">First name</label>
								<input type="text" className="inputSingup"
									value={this.state.firstName}
									onChange={this.handleFirstName}
								/>
								<div className={(this.state.showAlert && this.state.firstName.length == 0) ? "alert" : "alert nonActive"}>!    Enter first name</div>
							</form>
							<form className="form">
								<label className="label">Last name</label>
								<input type="text" className="inputSingup"
									value={this.state.lastName}
									onChange={this.handleLastName}
								/>
								<div className={(this.state.showAlert && this.state.lastName.length == 0) ? "alert" : "alert nonActive"}>!    Enter last name</div>
							</form>
						</section>

						<section>
							<h3 className="">Wallet ballance</h3>
							<form className="form">
								<label className="label">Ballance (PLN)</label>
								<input type="number" className="inputSingup" min="0" step="10"
									value={this.state.ballance}
									onChange={this.handleBallance}
								/>
							</form>
							<form className="form">
								<label className="label">FP Unit</label>
								<input type="number" className="inputSingup" min="0" step="1"
									value={this.state.fp}
									onChange={this.handleFp}
								/>
							</form>
							<form className="form">
								<label className="label">FPL Unit</label>
								<input type="number" className="inputSingup" min="0" step="100"
									value={this.state.fpl}
									onChange={this.handleFpl}
								/>
							</form>
							<form className="form">
								<label className="label">PGB Unit</label>
								<input type="number" className="inputSingup" min="0" step="100"
									value={this.state.pgb}
									onChange={this.handlePgb}
								/>
							</form>
							<form className="form">
								<label className="label">FPC Unit</label>
								<input type="number" className="inputSingup" min="0" step="50"
									value={this.state.fpc}
									onChange={this.handleFpc}
								/>
							</form>
							<form className="form">
								<label className="label">FPA Unit</label>
								<input type="number" className="inputSingup" min="0" step="50"
									value={this.state.fpa}
									onChange={this.handleFpa}
								/>
							</form>
							<form className="form">
								<label className="label">DL24 Unit</label>
								<input type="number" className="inputSingup" min="0" step="100"
									value={this.state.dl24}
									onChange={this.handleDl24}
								/>
							</form>
						</section>
					</div>
					{buttons}
					{/* <button onClick={this.handleSaveCreate} className="buttonSignUp">{this.props.buttonText}</button> */}
				</div>
			)
		}
	}


	class Main extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				stock: [],
				stockTime: '',
				showBuySell: false,
				showEditAccount: false,
				data: {}
			};
		}
			
		checkStock = name => {
			let stockPrice;
			this.state.stock.map(item => {
				if (item.code == name) {
					stockPrice = parseFloat(item.price).toFixed(2);
				}
			})
			return stockPrice;
		}

		checkUnit = (name) => {
			let stockUnit;
			this.state.stock.map(item => {
				if (item.code == name) {
					stockUnit = parseFloat(item.unit).toFixed(2);
				}
			})
			return stockUnit;
		}

		getStocks = () => {
			fetch('https://cors.io/?http://webtask.future-processing.com:8068/stocks', {
				method: "GET",
				dataType: "JSON",
				headers: {
					 'Accept': 'application/json'
					 }
			})
			.then(res => res.json())
			.then(res => {
				if (res.publicationDate !== this.state.stockTime) {
					this.setState({ 
						stock: res.items,
						stockTime: res.publicationDate
					});
				} 
			})
		}

		componentDidMount() {
			let user = JSON.parse(localStorage.getItem(this.props.match.params.userName));
			this.setState({
				login: user.login,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				ballance: parseFloat(user.ballance),
				FP: parseInt(user.fp),
				FPL: parseInt(user.fpl),
				PGB: parseInt(user.pgb),
				FPC: parseInt(user.fpc),
				FPA: parseInt(user.fpa),
				DL24: parseInt(user.dl24),
				showBuySell: false
			})

			this.getStocks();

			this.intervalId = setInterval(() => {
				this.getStocks();
			 }, 20000);
		}

		componentDidUpdate() {
			let data = {
				login: this.state.login,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				ballance: this.state.ballance,
				fp: this.state.FP,
				fpl: this.state.FPL,
				pgb: this.state.PGB,
				fpc: this.state.FPC,
				fpa: this.state.FPA,
				dl24: this.state.DL24
			}; 
			localStorage.setItem(this.state.login, JSON.stringify(data));
		}

		componentWillUnmount() {
			clearInterval(this.intervalId);
		} 

		handleEditSettings = () => {
			this.setState({
				showEditAccount: true
			})
		}

		removeAccount = () => {
			if (confirm("Are You sure?")) {
				if (confirm("Really?")) {
					localStorage.removeItem(this.state.login);
					setTimeout("location.href='#/';",500);
				} else {					
				}
			} else {					
			}
		}

		closeWindow = () => {
			this.setState({
				showEditAccount: false
			});
		}

		returnData = (data) => {
			this.setState({
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
				ballance: parseFloat(data.ballance),
				FP: parseInt(data.fp),
				FPL: parseInt(data.fpl),
				PGB: parseInt(data.pgb),
				FPC: parseInt(data.fpc),
				FPA: parseInt(data.fpa),
				DL24: parseInt(data.dl24),			
				showEditAccount: false
			});
		}

		handleLogout = () => {
			location.href='#/';
		}

		searchStock = data => {
			let temp = {};
			this.state.stock.map(item => {
				if (item.code == data) {
					temp = {... item};
				}
			})
			return temp;			
		}

		handleBuyFP = () => {
			this.setState({
				data: {name: 'FP', type: 'Buy', amount: this.state.FP, ballance: this.state.ballance, stock: this.searchStock('FP')},
				showBuySell: true
			});	
		}
		handleBuyFPL = () => {
			this.setState({
				data: {name: 'FPL', type: 'Buy', amount: this.state.FPL, ballance: this.state.ballance, stock: this.searchStock('FPL')},
				showBuySell: true
			});
		}
		handleBuyPGB = () => {
			this.setState({
				data: {name: 'PGB', type: 'Buy', amount: this.state.PGB, ballance: this.state.ballance, stock: this.searchStock('PGB')},
				showBuySell: true
			});	
		}
		handleBuyFPC = () => {
			this.setState({
				data: {name: 'FPC', type: 'Buy', amount: this.state.FPC, ballance: this.state.ballance, stock: this.searchStock('FPC')},
				showBuySell: true
			});	
		}
		handleBuyFPA = () => {
			this.setState({
				data: {name: 'FPA', type: 'Buy', amount: this.state.FPA, ballance: this.state.ballance, stock: this.searchStock('FPA')},
				showBuySell: true
			});	
		}
		handleBuyDL24 = () => {
			this.setState({
				data: {name: 'DL24', type: 'Buy', amount: this.state.DL24, ballance: this.state.ballance, stock: this.searchStock('DL24')},
				showBuySell: true
			});	
		}

		handleSellFP = () => {
			this.setState({
				data: {name: 'FP', type: 'Sell', amount: this.state.FP, ballance: this.state.ballance, stock: this.searchStock('FP')},
				showBuySell: true
			});	
		}
		handleSellFPL = () => {
			this.setState({
				data: {name: 'FPL', type: 'Sell', amount: this.state.FPL, ballance: this.state.ballance, stock: this.searchStock('FPL')},
				showBuySell: true
			});	
		}
		handleSellPGB = () => {
			this.setState({
				data: {name: 'PGB', type: 'Sell', amount: this.state.PGB, ballance: this.state.ballance, stock: this.searchStock('PGB')},
				showBuySell: true
			});	
		}
		handleSellFPC = () => {
			this.setState({
				data: {name: 'FPC', type: 'Sell', amount: this.state.FPC, ballance: this.state.ballance, stock: this.searchStock('FPC')},
				showBuySell: true
			});	
		}
		handleSellFPA = () => {
			this.setState({
				data: {name: 'FPA', type: 'Sell', amount: this.state.FPA, ballance: this.state.ballance, stock: this.searchStock('FPA')},
				showBuySell: true
			});	
		}
		handleSellDL24 = () => {
			this.setState({
				data: {name: 'DL24', type: 'Sell', amount: this.state.DL24, ballance: this.state.ballance, stock: this.searchStock('DL24')},
				showBuySell: true
			});	
		}

		newValues = (newBallance, newAmount, name) => {
			switch (name) {
				case 'FP':
					this.setState({
						ballance: newBallance,
						FP: newAmount,
						showBuySell: false
					});
			      break;
				case 'FPL':
					this.setState({
						ballance: newBallance,
						FPL: newAmount,
						showBuySell: false
					});
					break;
				case 'PGB':
					this.setState({
						ballance: newBallance,
						PGB: newAmount,
						showBuySell: false
					});
					break;
				case 'FPC':
					this.setState({
						ballance: newBallance,
						FPC: newAmount,
						showBuySell: false
					});
					break;
				case 'FPA':
					this.setState({
						ballance: newBallance,
						FPA: newAmount,
						showBuySell: false
					});
					break;
				case 'DL24':
					this.setState({
						ballance: newBallance,
						DL24: newAmount,
						showBuySell: false
					});
					break;
				default:
			}
			this.setState({
				showBuySell: false
			});
		}

		noNewValues = () => {
			this.setState({
				showBuySell: false
			});
		}

		render(){

			let buysell;
			if (this.state.showBuySell){
				buysell = <BuySell 
								data={this.state.data} 
								newValues={this.newValues}
								noNewValues={this.noNewValues}/>;
			} else{
				buysell = null;
			}
			let editAccount;
			if (this.state.showEditAccount) {
				editAccount = 
								<section  className="editAccount">
									<h1>Edit account</h1>
									<SignUpForms 
										firstName={this.state.firstName}
										lastName={this.state.lastName}
										login={this.state.login}
										password={this.state.password}
										repassword={this.state.password}
										ballance={this.state.ballance}
										fp={this.state.FP}
										fpl={this.state.FPL}
										pgb={this.state.PGB}
										fpc={this.state.FPC}
										fpa={this.state.FPA}
										dl24={this.state.DL24}
										edit={true}
										removeAccount={this.removeAccount}
										closeWindow={this.closeWindow}
										returnData={this.returnData}
										buttonText={'Save changes'}
									/>
								</section>
			} else {
				editAccount = null;
			 }

			return (
				<div className="container">
					<header className="mainHeader">
						<h1 className="mainHeaderTitle">Stocks</h1>
						<section className="mainHeaderMenu">
							<p>Logged in as <span>{this.state.firstName}</span> <span>{this.state.lastName}</span></p>
							<p onClick={this.handleEditSettings} className="editButton"></p>
							<p  onClick={this.handleLogout} className="logoutButton"></p>
						</section>
					</header>
					<section className="sectionContainer">
						<table className="leftTable">
							<thead>
								<tr>
									<td colSpan="3" className="tableTitle">Stock prices</td>
								</tr>
								<tr>
									<th scope="col">Company</th>
									<th scope="col">Value</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>FP</td>
									<td>{this.checkStock('FP')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyFP} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr>
									<td>FPL</td>
									<td>{this.checkStock('FPL')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyFPL} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr>
									<td>PGB</td>
									<td>{this.checkStock('PGB')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyPGB} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr>
									<td>FPC</td>
									<td>{this.checkStock('FPC')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyFPC} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr>
									<td>FPA</td>
									<td>{this.checkStock('FPA')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyFPA} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr>
									<td>DL24</td>
									<td>{this.checkStock('DL24')}</td>
									<td className="cellButtons"><button onClick={this.handleBuyDL24} className="buttonBuySell">Buy</button></td>
								</tr>
								<tr><td colSpan="3" className="dataTime">Data as of &nbsp;
									<span>{this.state.stockTime.substr(0,10)}</span> &nbsp;&#124;&nbsp;
									<span>{this.state.stockTime.substr(11,8)}</span>
								</td></tr>
							</tbody>
						</table>

						<table className="rightTable">
							<thead>
								<tr>
									<td colSpan="5" className="tableTitle">My wallet</td>
								</tr>
								<tr>
									<th scope="col">Company</th>
									<th scope="col">Unit price</th>
									<th scope="col">Amount</th>
									<th scope="col">Value</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>FP</td>
									<td>{this.checkStock('FP')}</td>
									<td>{this.state.FP}</td>
									<td>{((this.checkStock('FP') * this.state.FP)/this.checkUnit('FP')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellFP} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr>
									<td>FPL</td>
									<td>{this.checkStock('FPL')}</td>
									<td>{this.state.FPL}</td>
									<td>{((this.checkStock('FPL') * this.state.FPL)/this.checkUnit('FPL')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellFPL} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr>
									<td>PGB</td>
									<td>{this.checkStock('PGB')}</td>
									<td>{this.state.PGB}</td>
									<td>{((this.checkStock('PGB') * this.state.PGB)/this.checkUnit('PGB')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellPGB} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr>
									<td>FPC</td>
									<td>{this.checkStock('FPC')}</td>
									<td>{this.state.FPC}</td>
									<td>{((this.checkStock('FPC') * this.state.FPC)/this.checkUnit('FPC')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellFPC} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr>
									<td>FPA</td>
									<td>{this.checkStock('FPA')}</td>
									<td>{this.state.FPA}</td>
									<td>{((this.checkStock('FPA') * this.state.FPA)/this.checkUnit('FPA')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellFPA} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr>
									<td>DL24</td>
									<td>{this.checkStock('DL24')}</td>
									<td>{this.state.DL24}</td>
									<td>{((this.checkStock('DL24') * this.state.DL24)/this.checkUnit('DL24')).toFixed(2)}</td>
									<td className="cellButtons"><button onClick={this.handleSellDL24} className="buttonBuySell">Sell</button></td>
								</tr>
								<tr><td colSpan="5"></td></tr>
								<tr><td colSpan="5">Available money: <span>{this.state.ballance} PLN</span> </td></tr>
							</tbody>
						</table>
					</section>
					{buysell}
					{editAccount}					
				</div>
			)
		}
	}


	class BuySell extends React.Component {
		
		constructor(props) {
			super(props);
			this.state = {
				amount: 0,
				units: 0,
				showAlertBuy: false,
				showAlertSell: false
			};
		}

		handleClickBuySell = () => {
			let 	newBallance,
					newAmount;
			let statusOne = true;
			let statusTwo = true;
			if (this.props.data.type == 'Buy') {
				newBallance = (parseFloat(this.props.data.ballance) - ((parseInt(this.state.amount))*this.props.data.stock.price/this.props.data.stock.unit)).toFixed(2); 
				newAmount = this.props.data.amount + parseInt(this.state.amount);
				if (newBallance<0) {
					statusOne = false;
				}
			} else if (this.props.data.type == 'Sell') {
				newBallance = (parseFloat(this.props.data.ballance) + ((parseInt(this.state.amount))*this.props.data.stock.price/this.props.data.stock.unit)).toFixed(2); 
				newAmount = (this.props.data.amount - parseInt(this.state.amount));
				if (newAmount<0) {
					statusTwo = false;
				}
			}

			if (statusOne && statusTwo) {
				this.setState({
					showAlertBuy: false,
					showAlertSell: false
				});
				if ( typeof this.props.newValues === 'function' ){
					this.props.newValues(newBallance, newAmount, this.props.data.name);
				};
			} else {
				if (!statusOne) {
					this.setState({
						showAlertBuy: true
					});
				}else if (!statusTwo) {
					this.setState({
						showAlertSell: true
					});
				}
			}
		}

		handleClickCancel = () => {
			if ( typeof this.props.noNewValues === 'function' ){
				this.props.noNewValues();
			};
		}

		handleChangeAmount = (event) => {
			this.setState({
				amount: event.currentTarget.value,
			});
		}

		render() {
			let maxAmount;
			if (this.props.data.type == 'Buy') {
				maxAmount = ((this.props.data.ballance*this.props.data.stock.unit)/ this.props.data.stock.price).toFixed(0);
			} else if (this.props.data.type == 'Sell') {
				maxAmount = this.props.data.amount;
			}

			return(
				<section className="buySell">
					<p>{this.props.data.type} units <span className="bold"> {this.props.data.stock.name} </span> (  x{this.props.data.stock.unit}, max {maxAmount}) </p>
					<form>
							<input type="number" 
									className="inputBuySell" 
									min="0" 
									max={maxAmount} 
									step={this.props.data.stock.unit}
									value={this.state.amount}
									onChange={this.handleChangeAmount}
							/>
					</form>
					<div  className={(this.state.showAlertBuy) ? "alert" : "nonActive"}>!  Not enough Money</div>
					<div  className={(this.state.showAlertSell) ? "alert" : "nonActive"}>!  You can sell only {this.props.data.amount} units</div>
					<div className="buttons">
						<button onClick={this.handleClickCancel} className="buttonBuySell buttonDistance">Cancel</button>
						<button onClick={this.handleClickBuySell} className="buttonBuySell buttonDistance">{this.props.data.type}</button>
					</div>
				</section>
			)
		}
	}


	class NotFound extends React.Component {
		render() {
		  return(
            <div className="container">
                <main className="flexColumn">
                    <p className="notFound">We're sorry. The Web address you entered is not a functioning page on our site</p>
                    <section className="flexRow">
                        <p className="notFound">Go to&nbsp;</p>
                        <Link to="/" className="notFound"> Sign in</Link>
                        <p className="notFound">&nbsp;Page</p>
                    </section>
                </main>
            </div>
          ) 
		}
	 }

	ReactDOM.render(
		<App/>,
		document.getElementById('app')
	);

});
