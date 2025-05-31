const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#1A1A1A",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(193, 154, 107, 0.2)",
        color: "#E0E0E0",
      }}
    >
      <h2 style={{ color: "#C19A6B", fontWeight: "bold", marginBottom: "1rem" }}>
        Dashboard
      </h2>
      <p style={{ fontSize: "1.1rem" }}>
        Welcome to your dashboard! You can manage your account, view order history, and explore exclusive deals here.
      </p>
    </div>
  );
};

export default Dashboard;
