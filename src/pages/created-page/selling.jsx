import Button from "../../components/button/button";
import Card from "../../components/Card";

const Selling = ({ id, name, ipfsUrl, minterId, description }) => {
  return (
    <div className="created__selling">
      <div className="created__selling__content">
        <div className="card-container">
          <Card id={id} image={ipfsUrl} title={name} tag={minterId} />
        </div>

        <div className="form-container">
          <form>
            {/* Name */}
            <div className="form-item">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="no-border full-width"
                disabled
                value={name}
              />
            </div>
            {/* Description */}
            <div className="form-item">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                className="no-border full-width"
                disabled
                value={description}
              />
            </div>

            {/* rarity => dropdown */}
            <div className="form-item">
              <label htmlFor="rarity">Rarity</label>
              <select id="rarity" name="rarity">
                <option value="common">COMMON</option>
                <option value="uncommon">UNCOMMON</option>
                <option value="rare">RARE</option>
                <option value="epic">EPIC</option>
                <option value="mythical">MYTHICAL</option>
              </select>
            </div>

            {/* royalty in percent */}
            <div className="form-item">
              <label htmlFor="royalty">Royalty:</label>
              <input type="number" name="royalty" id="royalty" />
            </div>
          </form>
        </div>
      </div>

      <div>
        <Button onClick={() => {}}>btn</Button>
      </div>
    </div>
  );
};

export default Selling;
