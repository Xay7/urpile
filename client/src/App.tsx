import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <form action="http://localhost:3001/users/login" method="POST">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="checkbox" checked={true} name="remember" />
        <input type="submit" />
      </form>
      <form action="http://localhost:3001/users/logout" method="POST">
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
