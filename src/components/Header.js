import React, {Component} from 'react';
import {Link} from 'react-router';

// 컴포넌트안에서는 html 에서의 class를 className으로 바꿔서 써야한다.
class Header extends Component {
    render() {
    
        // 로그인 버튼 생성
        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );
 
        // 로그아웃 버튼생성
        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );
 
 
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>
 
                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>
 
                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

/*.. 코드생략 ..*/
Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};
 
Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error('logout function not defined');}
};
 

export default Header;