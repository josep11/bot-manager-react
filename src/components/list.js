import React, { useState, useEffect } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import axios from "axios";
import Loader from "react-loader-spinner";
import { dateToRelativeDate } from '../utils/utils';
import { botNames, orderBots } from '../utils/botutils';

const createPk = (keyword) => `LR#${keyword}`;
// const createSk = dateFormatted => `#DATE#${dateFormatted}`;

const pks = botNames.map(e => createPk(e))
const total_bots = botNames.length;

const baseURL = 'https://zi9bgvb5e3.execute-api.eu-west-3.amazonaws.com/Prod/';

function ListTable() {

    const [APIData, setAPIData] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(true);

    useEffect(() => {
        document.title = 'Bot Manager';
        let num_req_finished = 0;
        for (const pk of pks) {
            const url = `${baseURL}${encodeURIComponent(pk)}`;
            axios
                .get(url, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    response.data.name = response.data.pk.substring(3);
                    response.data.date = dateToRelativeDate(response.data.date);
                    setAPIData(APIData => [...APIData, response.data]);
                })
                // .catch(err => {
                //     // console.error('THERE was an error');
                //     console.error(err);
                // })
                // eslint-disable-next-line no-loop-func
                .finally(() => {
                    setAPIData(APIData => orderBots(APIData, botNames))
                    if (++num_req_finished === total_bots) {
                        setSpinnerLoading(false);
                    }
                })
        }

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
                        <Table.HeaderCell textAlign='right'>Últim Renovat</Table.HeaderCell>
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
