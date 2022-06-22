import React, { useEffect, useState } from "react";
import nature from "./assets/img/nature.jpg";

function Cards() {
  const [cards, setCards] = useState([]);
  const [search,setsearch] = useState('');

  const cardsdata = async () => {
    const results = await fetch(
      "https://iitm1blt3l.execute-api.ap-southeast-1.amazonaws.com/dev/hosted-events?limit=10"
    );
    const { events } = await results.json();
    console.log(events);
    setCards(events);
  };

  useEffect(() => {
    cardsdata();
  }, []);

  return (
    <div className="container">
      <h2 className="text-primary">Cards</h2>
        
        {/* searchbar start */}
      <div class="input-group mb-4">
  <div class="form-outline">
    <input type="search" id="form1" value={search} onChange={(e)=>setsearch(e.target.value)} class="form-control" />
  </div>
  <button type="button" class="btn btn-primary">search
  </button>
</div>
            {/* searchbar ends */}

      <div className="row">
        {cards.filter(card=>card.name.toLowerCase().includes(search)).map((card) => (
          <div className="col-md-3 mb-3">
            <div className="card" style={{ width: "18rem" }}>
              <img src={nature} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title" style={{ minHeight: "50px" }}>
                  {card.name}
                </h5>
                <div
                  class="btn-group mb-3"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                 
                  <button type="button" class="btn btn-warning">
                    {card.is_free ? 'free':'paid'}
                  </button>
                  <button type="button" class="btn btn-success">
                    {card.is_virtual ? "online" : 'offline'}
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
