import { useEffect, useState } from "react";
import { getUserInfo } from "../API/Api.js";
import { Container, Card, Spinner } from "react-bootstrap";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await getUserInfo();
      setLoggedUser(response.loggedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        backgroundColor: "#0D0D0D",
        color: "#E0E0E0",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          backgroundColor: "#1A1A1A",
          border: "1px solid #C19A6B",
          borderRadius: "1rem",
          boxShadow: "0 0 10px #C19A6B",
        }}
      >
        <h3 style={{ color: "#C19A6B", textAlign: "center" }}>Your Profile</h3>
        <p className="text-center mb-4" style={{ color: "#F5F5F5" }}>
          View your account information
        </p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : loggedUser ? (
          <>
            <p>
              <strong style={{ color: "#C19A6B" }}>Name:</strong>{" "}
              <span style={{ color: "white" }}>{loggedUser.name}</span>
            </p>
            <p>
              <strong style={{ color: "#C19A6B" }}>Email:</strong>{" "}
              <span style={{ color: "white" }}>{loggedUser.email}</span>
            </p>
            <p>
              <strong style={{ color: "#C19A6B" }}>Admin:</strong>{" "}
              <span style={{ color: "white" }}>
                {loggedUser.isAdmin ? "Yes" : "No"}
              </span>
            </p>
          </>
        ) : (
          <p style={{ color: "red" }}>Failed to load profile.</p>
        )}
      </Card>
    </Container>
  );
};

export default Profile;
