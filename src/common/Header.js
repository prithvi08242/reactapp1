
function Header() {

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    function handleLogout() {
        localStorage.clear();
        window.location = "/login";
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid bg-success">
               <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/myLogo.png"
            alt="Logo"
            width="120"
            height="40"
            className="d-inline-block align-text-top"
          />
          <span className="ms-2 text-white fw-bold">e-commerce</span>
        </a>

                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search"
                        placeholder="Search for Products,Brands and More" aria-label="Search"
                        style={{ width: '800px' }}
                    />
                </form>

                <div className="d-flex align-items-center justify-content-between w-100">
                    <ul className="navbar-nav flex-row align-items-center">
                        <li className="nav-item">
                            <a href="/cart">
                                <span className="nav-link text-white fw-bold">Cart</span>
                            </a>
                        </li>
                    </ul>


                    <ul className="navbar-nav flex-row ">
                        {
                            user && (

                                <>
                                    {/* Admin only links */}
                                    {user.credential?.roleBasedAuthority?.includes("ROLE_ADMIN") && (
                                        <>
                                            <li className="nav-item me-3">
                                                <a className="nav-link text-white fw-bold" href="/addProduct">Add Product</a>
                                            </li>
                                            <li className="nav-item me-3">
                                                <a className="nav-link text-white fw-bold" href="/users">Users</a>
                                            </li>
                                            <li className="nav-item me-3">
                                                <a className="nav-link text-white fw-bold" href="/shipping">Shipping</a>
                                            </li>
                                        </>
                                    )}

                                    {/* Commong to all loggedin users */}

                                    <li className="nav-item me-3">
                                        <a className="nav-link text-white fw-bold" href="/products">Products</a>
                                    </li>
                                    <li className="nav-item me-3">
                                        <a className="nav-link text-white fw-bold" href="/ordersList">My Order</a>
                                    </li>
                                    <li className="nav-item dropdown me-3">
                                        <a className="nav-link text-light" 
                                            href="/" 
                                            // id="userDropDown" 
                                            // role="button"
                                            aria-expanded="false"
                                            data-bs-toggle="dropdown"> 
                                            <i className="bi bi-person-circle me-1"></i>{user?.firstName}
                                            
                                        </a>

                                        <ul class="dropdown-menu dropdown-menu-end" >
                                            <li><a class="dropdown-item" href="/profile">My Profile</a></li>
                                            <li><a class="dropdown-item" href="/changePassword">Change Password</a></li>
                                            <li><a class="dropdown-item" href="/ordersList">MyOrders</a></li>
                                            <li><hr className="dropdown-divider"></hr></li>
                                            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                                        </ul>
                                    </li>
                                </>

                            )
                        }


                        {
                            !user && (
                                <li className="nav-item d-flex gap-2">
                                    <a className="btn btn-outline-light" href="/register"><i class="bi bi-person-plus me-1"></i>Register</a>
                                    <a className="btn btn-outline-light" href="/login"><i class="bi bi-box-arrow-in-right me-1"></i>Login</a>
                                </li>
                            )
                        }


                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Header;