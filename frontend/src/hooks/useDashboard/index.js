import { useState, useEffect } from "react";
import toastError from "../../errors/toastError";

import api from "../../services/api";

const useDashboard = ({
	searchParam,
	pageNumber,
	status,
	date,
	showAll,
	queueIds,
	withUnreadMessages,
	tags,
}) => {
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const [tickets, setTickets] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		setLoading(true);
		const delayDebounceFn = setTimeout(() => {
			const fetchTickets = async () => {
				try {
					const { data } = await api.get("/dashboard", {
						params: {
							searchParam,
							pageNumber,
							status,
							date,
							showAll,
							queueIds,
							withUnreadMessages,
							tags,
						},
					})
					setTickets(data.tickets)

					

					

					setHasMore(data.hasMore)
					setCount(data.count)
					setLoading(false)
				} catch (err) {
					setLoading(false)
					toastError(err)
				}
			}

			

			fetchTickets()
		}, 500)
		return () => clearTimeout(delayDebounceFn)
	}, [
		searchParam,
		pageNumber,
		status,
		date,
		showAll,
		queueIds,
		withUnreadMessages,
		tags,
	])

	return { tickets, loading, hasMore, count };
};

export default useDashboard;