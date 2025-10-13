import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Component/Index/Index";
import About from "./Component/About/About";
import Donation from "./Component/Donation/Donation";
import Gallery from "./Component/Gallery/Gallery";
import Leader from "./Component/Leader/Leader";
import Contact from "./Component/Contact/Contact";
import Building from "./Component/deatails-page/building";
import Mathuram from "./Component/deatails-page/mathuram";
import Collection from "./Component/deatails-page/Collection";
import Homecare from "./Component/deatails-page/home-care";
import Fundcollection from "./Component/deatails-page/fund-collection";
import Training from "./Component/deatails-page/Training";
import SubmitForm from "./Component/deatails-page/SubmitForm";
import Yathra from "./Component/deatails-page/yathra";
import OrderSuccess from "./Component/deatails-page/OrderSuccess";
import Trandingpage from "./Component/deatails-page/Trandingpage";
import Statuscount from "./Component/deatails-page/Statuscount";
import Datapage from "./Component/deatails-page/Datapage";
import Delivery_status from "./Component/deatails-page/delivery_status";
import TVDeliveryStatus from "./Component/deatails-page/TVDeliveryStatus";
// import OrderReceipt from './Component/deatails-page/reciept';

// import MainEffects from './Component/MainEffects';
// import Spinner from './Component/Spinner';

function App() {
  return (
    <Router>
      {/* <MainEffects /> */}
      {/* <Spinner /> */}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/Donate-for-pandikkad-santhwanam-palliative-care-society"
          element={<Donation />}
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/leaders" element={<Leader />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/building" element={<Building />} />
        <Route path="/payasa-challenge" element={<Mathuram />} />
        <Route path="/fund-collection" element={<Fundcollection />} />
        <Route path="/home-care" element={<Homecare />} />
        <Route path="/santhwana-yathra" element={<Yathra />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/training" element={<Training />} />
        <Route
          path="/Payasa-challenge-2025-orderform-pandikkad-palliative"
          element={<SubmitForm />}
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/Pandikkad-santhwanam-palliative-payasa-challenge-trending-now"
          element={<Trandingpage />}
        />
        <Route path="/Statuscount/:id" element={<Statuscount />} />
        <Route path="/Datapage" element={<Datapage />} />
        <Route
          path="/Pandikkad-santhwanam-palliative-payasa-challenge-delivery-status"
          element={<Delivery_status />}
        />
        <Route path="/tv-display" element={<TVDeliveryStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
