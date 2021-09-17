import React, { useState, useEffect } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import axios from "axios";

const createPk = (keyword) => `LR#${keyword}`;
// const createSk = dateFormatted => `#DATE#${dateFormatted}`;

const botNames = [ //TODO: parametrise somewhere else
    'Feinaactiva',
    'Infofeina'
];
const pks = botNames.map(e => createPk(e))
const baseURL = 'https://iqaeyr2wdb.execute-api.eu-west-3.amazonaws.com/Prod/';

function ListTable() {

    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        return; //TODO: remove
        for (const pk of pks) {
            const url = `${baseURL}${encodeURIComponent(pk)}`;
            console.log(url);
            axios.get(url)
                .then((response) => {
                    console.log(response.data)
                    setAPIData(response.data);
                })
        }

    }, [])
    const [pk, setPk] = useState('');
    const [date, setDate] = useState('');
    return (
        <Table celled className="list-table">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>PK</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    {/* <Table.Cell>
                        <Label ribbon>First</Label>
                    </Table.Cell> */}
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Cell</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                </Table.Row>
            </Table.Body>

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
        </Table>
    )
}

export default ListTable
