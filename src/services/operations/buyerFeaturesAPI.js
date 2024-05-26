import { toast } from "react-hot-toast";
import Logo from "../../assets/Logo.jpg"
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/productSlice"
import { apiConnector } from "../apiConnector";
import { buyerEndpoints } from "../apis";

const {
  PRODUCT_PAYMENT_API,
  PRODUCT_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = buyerEndpoints;

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Buy the Course
export async function BuyCourse(
  token,
  products,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      );
      return;
    }

    // Initiating the Order in Backend
    const orderResponse = await apiConnector(
      "POST",
      PRODUCT_PAYMENT_API,
      {
        products,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log(
      "PAYMENT RESPONSE FROM BACKEND............",
      orderResponse.data,
    );

    //here is i give more than 5 hour
    let Razorpay_key = "rzp_test_CjJEAD3msWDnks";
    // Opening the Razorpay SDK
    const options = {
      key: Razorpay_key,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "PimeCommerce",
      description: "Thank you for Purchasing the Product.",
      image: Logo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, products }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR............", error);
    toast.error("Could Not make Payment.");
  }
  toast.dismiss(toastId);
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", PRODUCT_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    console.log(
      "VERIFY PAYMENT RESPONSE FROM BACKEND............",
      response
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful.your product will be deliver soon ");
    navigate("/dashboard/enrolled-products");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error);
  }
}
