import React, { useEffect, useState } from 'react'
import { getDate } from '../../../../utils/getDate';
import UserService from '../../../../services/UserService';
import { useSelector } from 'react-redux';
import Order from '../../order/Order';
import style from './history.module.scss'
import HistoryItem from '../historyItem/HistoryItem';
export default function History() {
    
    const [history, setHistory] = useState([])
    const [purchases, setPurchases] = useState([])

    const user = useSelector(state => state.user.user)
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        function sortDate(objects) {
            objects.sort((a, b) => new Date(b.date) - new Date(a.date));
            return objects;
        }

        const getResponse = async () => {
            const response = await UserService.getHistory(user.id)
            const data = await sortDate(response.data)
            getDate(data)
            setHistory(data)
        }
        getResponse()
    }, [])

    useEffect(() => {
        const purchasesByDate = history.reduce((acc, curr) => {
            if (acc[curr.date]) {
                acc[curr.date].push(curr);
            } else {
                acc[curr.date] = [curr];
            }
            return acc;
        }, {});
        
        setPurchases(Object.entries(purchasesByDate))
    }, [history])

    // helper function to calculate total sum of products in a purchase
    const calculateTotal = (purchase) => {
        let total = 0;
        purchase.forEach((item) => {
            const product = products.find(p => p.id === item.product_id);
            total += product.price * item.count;
        });
        return total;
    }

    return (
        <div>
            {purchases.map(([date, purchases]) => {
                const totalSum = calculateTotal(purchases);
                return (
                    <div key={date}>
                        <h3>{totalSum}$</h3>
                        <h3>{date}</h3>
                        {purchases.map((purchase) => (
                            products.map(product => {
                                if (product.id === purchase.product_id) {
                                    product = { ...product, count: purchase.count}
                                    return <HistoryItem key={purchase.id} item={product} />
                                }
                                return null
                            })
                        ))}
                    </div>
                );
            })}    
        </div>
    )
}
