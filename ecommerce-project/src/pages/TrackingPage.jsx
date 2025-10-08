import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {

    const { orderId, productId } = useParams();
    const [trackingData, setTrackingData] = useState(null);


    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios(`/api/orders/${orderId}?expand=products`);

            setTrackingData(response.data);
        }

        fetchTrackingData();
    }, [orderId])

    if (!trackingData) {
        return null;
    }

    const orderProduct = trackingData.products
        .find((order) => {
            return order.productId === productId;
        });

    console.log(orderProduct);

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM, D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}