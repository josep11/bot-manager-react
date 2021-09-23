import React, { useState, useEffect } from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import axios from "axios";

const createPk = (keyword) => `LR#${keyword}`;
// const createSk = dateFormatted => `#DATE#${dateFormatted}`;

const botNames = [ //TODO: parametrise somewhere else
    'Feinaactiva',
    'Infofeina',
    'Milanuncios',
    'Wallapop'
];
const pks = botNames.map(e => createPk(e))
const baseURL = 'https://zi9bgvb5e3.execute-api.eu-west-3.amazonaws.com/Prod/';

function ListTable() {

    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        // TODO: remove this mock
        // setAPIData([
        //     { sk: '#DATE#2021-09-18', date: '2021-09-18', pk: 'MOCK' },
        //     { sk: '#DATE#2021-09-21', date: '2021-09-21', pk: 'Infofeina' }
        // ]);
        // setAPIData(APIData => [...APIData,
        // { sk: '#DATE#2021-09-18', date: '2021-09-18', pk: 'MOCK 222222' },
        // ]);
        // return;
        for (const pk of pks) {
            const url = `${baseURL}${encodeURIComponent(pk)}`;
            // const url = `${baseURL}888`;
            console.log(url);
            // https://axios-http.com/docs/req_config
            axios
                .get(url, {
                    headers:
                        { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    // console.log(response.data)
                    response.data.pk = response.data.pk.substring(3);

                    setAPIData(APIData => [...APIData, response.data]);
                    console.log(APIData)
                })
                .catch(err => {
                    // console.error('THERE was an error');
                    console.error(err);
                })
        }

    }, [setAPIData])
    return (
        <Table celled className="list-table">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Bot Name</Table.HeaderCell>
                    {/* <Table.HeaderCell>PK</Table.HeaderCell> */}
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {APIData && APIData.map((item, i) => (
                < Table.Body key={i}>
                    <Table.Row>
                        {/* <Table.Cell>
        <Label ribbon>First</Label>
    </Table.Cell> */}
                        <Table.Cell ribbon>{item.pk}</Table.Cell>
                        {/* <Table.Cell>{item.pk}</Table.Cell> */}
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
    )
}

export default ListTable
