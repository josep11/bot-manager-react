import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { dateToRelativeDate, isDev, parseDateTime } from "../utils/utils";
import { orderBots } from "../utils/botutils";
import { getBotNames, getLastRenewed } from "./apiWrapper";
import { TailSpin } from "react-loader-spinner";
import { DateTime } from "luxon";
import { LastRenewed } from "./model/last-renewed";

const createPk = (keyword: string) => `LR#${keyword}`;

async function getBotNamesWrapper() {
	let botNames = await getBotNames();
	if (isDev()) {
		console.log("dev");
		botNames = botNames.slice(2, 4);
	}
	// Commented out bot names start with "#"
	botNames = botNames.filter((e: string) => !e.startsWith("#"));
	return botNames;
}

function ListTable() {
	const [APIData, setAPIData] = useState<LastRenewed[]>([]);
	const [spinnerLoading, setSpinnerLoading] = useState(true);

	useEffect(() => {
		async function fetchAPI() {
			const botNames = await getBotNamesWrapper();
			const pks = botNames.map((e: string) => createPk(e));
			const countRequestsToDo = botNames.length;
			let countRequestsDone = 0;

			for (const pk of pks) {
				const data = await getLastRenewed(pk);

				countRequestsDone++;

				if (!data) {
					continue;
				}

				const name = data.pk.substring(3);
				let lastRenewedTime: string | null = null,
					dateLocaleString: string | null = null;

				try {
					const datetime = parseDateTime(data.date);
					lastRenewedTime = datetime.toLocaleString(DateTime.TIME_24_SIMPLE);
					dateLocaleString = dateToRelativeDate(datetime);
					console.log(
						`${name}: ${
							datetime ? datetime.toLocaleString(DateTime.DATETIME_SHORT) : ""
						}`
					);
				} catch (err) {}

				setAPIData((APIData) => [
					...APIData,
					{
						name,
						dateLocaleString,
						lastRenewedTime,
					},
				]);
				setAPIData((APIData) => orderBots(APIData, botNames));
				if (countRequestsDone === countRequestsToDo) {
					setSpinnerLoading(false);
				}
			}
		}

		fetchAPI();
	}, [setAPIData]);
	return (
		<div style={{ textAlign: "center" }}>
			<TailSpin
				// textAlign="center"
				color="#00BFFF"
				height={50}
				width={50}
				visible={spinnerLoading}
			/>

			<Table celled className="list-table">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Nom del Bot</Table.HeaderCell>
						<Table.HeaderCell textAlign="right">Renovat</Table.HeaderCell>
						<Table.HeaderCell textAlign="right">Hora</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				{APIData &&
					APIData.map((item, i) => (
						<Table.Body key={i}>
							<Table.Row>
								<Table.Cell>{item.name}</Table.Cell>
								<Table.Cell textAlign="right">
									{item.dateLocaleString}
								</Table.Cell>
								<Table.Cell textAlign="right">
									{item.lastRenewedTime}
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					))}

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="3">
							<Menu floated="right" pagination>
								<Menu.Item as="a" icon>
									<Icon name="chevron left" />
								</Menu.Item>
								<Menu.Item as="a">1</Menu.Item>
								<Menu.Item as="a">2</Menu.Item>
								<Menu.Item as="a">3</Menu.Item>
								<Menu.Item as="a">4</Menu.Item>
								<Menu.Item as="a" icon>
									<Icon name="chevron right" />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</div>
	);
}

export default ListTable;
