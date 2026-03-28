import React, { useState } from "react";
import { addMarketplaceVehicle } from "../services/vehicleService";

function SellVehicle() {

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    company: "",
    model: "",
    year: "",
    fuelType: "",
    transmission: "",
    kmDriven: "",

    color: "",
    owners: "",
    accidentHistory: "",
    serviceHistory: "",

    insuranceType: "",
    pucStatus: "",
    rcAvailable: "",
    permit: "",

    price: "",
    city: "",
    phone: "",
    description: "",

    images: [""]
  });

  // IMAGE HANDLING
  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const updateImage = (value, index) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      await addMarketplaceVehicle(form);
      alert("Vehicle listed successfully 🚀");
      setStep(1);
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Sell Your Vehicle 🚗</h1>

      <div style={styles.form}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>Basic Details</h3>

            <input placeholder="Company" style={styles.input}
              onChange={(e)=>setForm({...form, company:e.target.value})}/>

            <input placeholder="Model" style={styles.input}
              onChange={(e)=>setForm({...form, model:e.target.value})}/>

            <input type="number" placeholder="Year" style={styles.input}
              onChange={(e)=>setForm({...form, year:e.target.value})}/>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, fuelType:e.target.value})}>
              <option>Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
              <option>Electric</option>
            </select>

            <button onClick={()=>setStep(2)} style={styles.nextBtn}>Next ➡️</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3>Vehicle Condition</h3>

            <input placeholder="KM Driven" style={styles.input}
              onChange={(e)=>setForm({...form, kmDriven:e.target.value})}/>

            <input placeholder="Color" style={styles.input}
              onChange={(e)=>setForm({...form, color:e.target.value})}/>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, owners:e.target.value})}>
              <option>Owners</option>
              <option>1</option>
              <option>2</option>
            </select>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, accidentHistory:e.target.value})}>
              <option>Accident History</option>
              <option>No</option>
              <option>Yes</option>
            </select>

            <div style={styles.nav}>
              <button onClick={()=>setStep(1)}>⬅️ Back</button>
              <button onClick={()=>setStep(3)}>Next ➡️</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3>Documents</h3>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, insuranceType:e.target.value})}>
              <option>Insurance</option>
              <option>Comprehensive</option>
              <option>Third Party</option>
            </select>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, pucStatus:e.target.value})}>
              <option>PUC</option>
              <option>Valid</option>
              <option>Expired</option>
            </select>

            <select style={styles.input}
              onChange={(e)=>setForm({...form, rcAvailable:e.target.value})}>
              <option>RC Available</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <div style={styles.nav}>
              <button onClick={()=>setStep(2)}>⬅️ Back</button>
              <button onClick={()=>setStep(4)}>Next ➡️</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h3>Pricing & Contact</h3>

            <input placeholder="Price ₹" style={styles.input}
              onChange={(e)=>setForm({...form, price:e.target.value})}/>

            <input placeholder="City" style={styles.input}
              onChange={(e)=>setForm({...form, city:e.target.value})}/>

            <input placeholder="Phone" style={styles.input}
              onChange={(e)=>setForm({...form, phone:e.target.value})}/>

            <textarea placeholder="Description"
              style={styles.input}
              onChange={(e)=>setForm({...form, description:e.target.value})}/>

            <div style={styles.nav}>
              <button onClick={()=>setStep(3)}>⬅️ Back</button>
              <button onClick={()=>setStep(5)}>Next ➡️</button>
            </div>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h3>Images</h3>

            {form.images.map((img, i) => (
              <input key={i}
                placeholder="Image URL"
                style={styles.input}
                onChange={(e)=>updateImage(e.target.value,i)}
              />
            ))}

            <button onClick={addImageField}>➕ Add Image</button>

            <div style={styles.nav}>
              <button onClick={()=>setStep(4)}>⬅️ Back</button>
              <button onClick={handleSubmit} style={styles.submitBtn}>
                🚀 Submit
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: { padding: 30, maxWidth: 500, margin: "auto" },
  title: { textAlign: "center" },
  form: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: "100%"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between"
  },
  nextBtn: {
    padding: 10,
    background: "#2563eb",
    color: "white",
    border: "none"
  },
  submitBtn: {
    padding: 10,
    background: "green",
    color: "white",
    border: "none"
  }
};

export default SellVehicle;