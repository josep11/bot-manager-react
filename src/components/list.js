import React, { useState, useEffect } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import { dateToRelativeDate, isDev, parseDateTime } from '../utils/utils';
import { orderBots } from '../utils/botutils';
import { getBotNames, getLastRenewed } from './apiWrapper';
import Loader from 'react-loader-spinner';
import { DateTime } from 'luxon';

const createPk = (keyword) => `LR#${keyword}`;
// const createSk = dateFormatted => `#DATE#${dateFormatted}`;

function ListTable() {

    const [APIData, setAPIData] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(true);

    useEffect(() => {
        async function fetchAPI() {
            let botNames = await getBotNames();
            if (isDev()) {
                console.log('dev');
                botNames = botNames.slice(2, 4);
            }
            // Commented out bot names start with "#"
            botNames = botNames.filter(e => !e.startsWith("#"));
            const pks = botNames.map(e => createPk(e))
            const total_bots = botNames.length;
            let num_req_finished = 0;
            for (const pk of pks) {

                const data = await getLastRenewed(pk);

                num_req_finished++;

                if (!data) { continue; }

                data.name = data.pk.substring(3);
                data.date = parseDateTime(data.date);
                console.log(`${data.name}: ${data.date.toLocaleString(DateTime.DATETIME_SHORT)}`);
                data.date = dateToRelativeDate(data.date);
                setAPIData(APIData => [...APIData, data]);

                setAPIData(APIData => orderBots(APIData, botNames))
                if (num_req_finished === total_bots) {
                    setSpinnerLoading(false);
                }
            }
        }

        fetchAPI();

    }, [setAPIData])
    return (
        <div style={{ textAlign: "center" }} >

            <Loader
                // textAlign="center"
                type="TailSpin"
                color="#00BFFF"
                height={50}
                width={50}
                visible={spinnerLoading}
            />

            <Table celled className="list-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nom del Bot</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>??ltim Renovat</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {APIData && APIData.map((item, i) => (
                    < Table.Body key={i}>
                        <Table.Row>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell textAlign='right'>{item.date}</Table.Cell>
                        </Table.Row>
                    </Table.Body>

                ))}

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table >
        </div >

    )
}

export default ListTable
