import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Settings = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginTop:'20px'}}>
            <DropdownToggle caret>
                Settings
            </DropdownToggle>
            <DropdownMenu style={{marginRight:'34px'}} >
                <DropdownItem onClick={props.resetPassword}>Reset <br/> Password</DropdownItem>
                <DropdownItem onClick={props.handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default Settings



//   return (
//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>
//         Dropdown
//         </DropdownToggle>
//       <DropdownMenu>
//         <DropdownItem header>Header</DropdownItem>
//         <DropdownItem>Some Action</DropdownItem>
//         <DropdownItem text>Dropdown Item Text</DropdownItem>
//         <DropdownItem disabled>Action (disabled)</DropdownItem>
//         <DropdownItem divider />
//         <DropdownItem>Foo Action</DropdownItem>
//         <DropdownItem>Bar Action</DropdownItem>
//         <DropdownItem>Quo Action</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

// export default Settings