function App() {
    return (
        <>
            <header>
                <div class="header-wrapper">
                    <div>
                        <a class="navlink-selected" href="tournaments/index.html">Tournaments</a>
                        <a href="participants/index.html">Participants</a>
                        <a href="categories/index.html">Categories</a>
                    </div>
                    <div>
                        <span id="user-name">Jan Nowak</span>
                        <button id="logout-btn">Logout</button>
                    </div>
                </div>
            </header>

            <div class="wrapper">
                <h2>Welcome</h2>
                <p>Hello, world!</p>
            </div>
        </>
    );
}

export default App;
