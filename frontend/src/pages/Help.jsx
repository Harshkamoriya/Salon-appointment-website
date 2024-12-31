import React from "react";
import styled from "styled-components";
const HelpPage = () => {
  const articles = [
    {
      title: "How to Book an Appointment",
      description: "Learn the steps to book your salon appointment quickly.",
    },
    {
      title: "Payment Methods",
      description: "Explore the various payment options available.",
    },
    {
      title: "Rescheduling Appointments",
      description: "Steps to modify your appointment if plans change.",
    },
    {
      title: "Our Services",
      description: "Browse the range of salon services we offer.",
    },
  ];

  return (
    <Wrapper>
    <div className="help-page">
      {/* Header Section */}
      <header className="help-header">
        <h1>How can we help?</h1>
        <input
          type="text"
          placeholder="Search for help articles"
          className="search-bar"
        />
        <p className="popular-links">
          Popular help articles:{" "}
          <a href="#privacy">Privacy FAQs</a>,{" "}
          <a href="#booking">How to Book an Appointment</a>
        </p>
      </header>

      {/* Featured Article Section */}
      <section className="featured-article">
        <h2>Featured Article</h2>
        <p>How to Create the Perfect Salon Experience</p>
      </section>

      {/* Getting Started Section */}
      <section className="getting-started">
        <h2>Getting Started</h2>
        <div className="articles-grid">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    /* HelpPage.css */
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  color: #333;
}

.help-page {
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
}

/* Header Section */
.help-header {
    background: linear-gradient(135deg, #cb9c11, #fc25a2);
  color: white;
  padding: 60px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.help-header h1 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.search-bar {
  width: 70%;
  max-width: 600px;
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  margin: 20px 0;
}

.popular-links {
  margin-top: 10px;
  font-size: 0.9rem;
}

.popular-links a {
  color: #ffda79;
  text-decoration: none;
  font-weight: bold;
}

.popular-links a:hover {
  text-decoration: underline;
}

/* Featured Article Section */
.featured-article {
  background: white;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: center;
}

.featured-article h2 {
  font-size: 1.6rem;
  color: #004aad;
  margin-bottom: 10px;
}

/* Getting Started Section */
.getting-started {
  padding: 30px 20px;
}

.getting-started h2 {
  font-size: 2rem;
  color: #004aad;
  margin-bottom: 20px;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.article-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.article-card h3 {
  font-size: 1.2rem;
  color: #004aad;
  margin-bottom: 10px;
}

.article-card p {
  font-size: 0.9rem;
  color: #555;
}

`

export default HelpPage;
