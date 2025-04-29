import React from 'react';
import { Table as SemanticTable, TableProps } from 'semantic-ui-react';

const CustomTable: React.FC<TableProps> = (props) => {
    return <SemanticTable {...props} />;
};

CustomTable.displayName = 'CustomTable';

// Re-export all sub-components
export const Table = Object.assign(CustomTable, {
    Body: SemanticTable.Body,
    Cell: SemanticTable.Cell,
    Footer: SemanticTable.Footer,
    Header: SemanticTable.Header,
    HeaderCell: SemanticTable.HeaderCell,
    Row: SemanticTable.Row,
});

export default Table;