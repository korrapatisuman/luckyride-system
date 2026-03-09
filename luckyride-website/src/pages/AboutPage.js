import React from "react";

function AboutPage() {
  return (
    <div style={styles.container}>

      <h1 style={styles.title}>About LuckyRide</h1>

      <p style={styles.text}>
        LuckyRide is a modern vehicle rental and ride booking service designed
        to make transportation easy, safe, and affordable for everyone.
      </p>

      <p style={styles.text}>
        We provide a variety of vehicles including Autos, Cars, and Travellers
        for city rides, airport transfers, and group travel.
      </p>

      <p style={styles.text}>
        Our mission is to provide reliable transportation with professional
        drivers and a seamless booking experience through our mobile app
        and website.
      </p>

    </div>
  );
}

const styles = {

  container: {
    padding: "60px 20px",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center"
  },

  title: {
    marginBottom: "30px"
  },

  text: {
    fontSize: "18px",
    marginBottom: "20px",
    lineHeight: "1.6"
  }

};

export default AboutPage;