import insurance from "../model/insurance.model.js";
import insuranceAmountLogic from "../logic/insurance.logic.js";

/**
 * POST /api/insurance
 * Create an insurance record for a given shipment and return the UPI payment URL.
 */
const getInsurance = async (req, res) => {
  const { shipmentId, amount, mode, deligacy } = req.body;

  if (!shipmentId || !amount || !mode || !deligacy) {
    return res.status(400).json({ response: "All fields are required" });
  }

  try {
    const insuranceAmount = insuranceAmountLogic(Number(amount), deligacy);

    if (insuranceAmount === undefined || insuranceAmount === null) {
      return res.status(400).json({ response: "Could not calculate insurance amount" });
    }

    const insuranceData = await insurance.create({
      shipmentId,
      amount: Number(amount),
      mode,
      deligacy,
      insuranceAmount,
      insuranceStatus: "PENDING",
    });

    const upiUrl = `upi://pay?pa=v17957621@oksbi&pn=AGGREGATOR%20SOFTWARE&am=${insuranceAmount}&cu=INR&tn=${insuranceData._id}`;

    return res.status(201).json({
      response: "Insurance created successfully",
      insurance: insuranceData,
      insuranceAmount,
      upiUrl,
    });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};

/**
 * POST /api/insurance/validate
 * Mark insurance as PAID after user submits UTR / payment screenshot.
 */
const validateInsuranceAmount = async (req, res) => {
  const { insuranceId, utrNumber, paymentScreenshot } = req.body;

  if (!insuranceId || !utrNumber) {
    return res.status(400).json({ response: "insuranceId and utrNumber are required" });
  }

  try {
    const insuranceCheck = await insurance.findById(insuranceId);

    if (!insuranceCheck) {
      return res.status(404).json({ response: "Insurance record not found" });
    }

    if (insuranceCheck.insuranceStatus === "PAID") {
      return res.status(400).json({ response: "Payment already verified" });
    }

    insuranceCheck.insuranceStatus = "PAID";
    insuranceCheck.utrNumber = utrNumber;
    if (paymentScreenshot) {
      insuranceCheck.paymentScreenshot = paymentScreenshot;
    }
    await insuranceCheck.save();

    return res.status(200).json({
      response: "Payment verified successfully",
      insurance: insuranceCheck,
    });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};

export { getInsurance, validateInsuranceAmount };