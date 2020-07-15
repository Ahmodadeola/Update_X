import React, { Component } from "react";
import Logo from "../Logo/Logo";
import MobileNav from "../Navigation/MobileNav/MobileNav";
import DrawerToggle from "../Navigation/DrawerToggle/DrawerToggle";
import classes from "./Nav.module.css";
import SearchInput from "../Navigation/SearchBar/SearchBar";
import BackDrop from "../../Containers/UI/BackDrop/BackDrop";
import { connect } from "react-redux";

class Nav extends Component {
	state = {
		showToggle: false,
		showSearchInput: false,
	};

	sideNavHandler = () => {
		let show = this.state.showToggle;
		this.setState({ showToggle: !show });
	};

	SearchInputHandler = () => {
		let show = this.state.showSearchInput;
		this.setState({ showSearchInput: !show });
	};

	activeTabHandler = (e) => {
		console.log(e.target.key);
	};

	render() {
		const links = this.props.links;
		return (
			<div>
				<BackDrop
					show={this.state.showToggle}
					clicked={() => this.sideNavHandler()}
				/>
				<nav className={classes.Nav}>
					<Logo />
					<SearchInput
						show={this.state.showSearchInput}
						clicked={() => this.SearchInputHandler()}
					/>

					<DrawerToggle clicked={() => this.sideNavHandler()} />
				</nav>
				<MobileNav
					links={links}
					show={this.state.showToggle}
					clicked={() => this.sideNavHandler()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		links: state.links,
	};
};

export default connect(mapStateToProps)(Nav);
