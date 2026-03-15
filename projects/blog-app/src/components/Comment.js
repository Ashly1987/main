import React from 'react' ;

import UserInfoContext from '../context/UserInfoContext' ;

export default function Comment() {
    const {username,isAdmin} = React.useContext(UserInfoContext) ;
    return (
        <div>
            <h3>Comment by </h3>
            <p>Logged In as... {username}</p>
            {isAdmin && <button>Edit Comment</button>}
        </div>
    ) ;
}