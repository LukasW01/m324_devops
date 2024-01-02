import React from "react";
import {Table} from "@geist-ui/core";
import '../../css/skeleton.css';


const TableEmpty: React.FC = () => {
    return (
        <Table data={[{ task: "No Task found" }]}>
            <Table.Column prop={"task"} label={"Task"}></Table.Column>
            <Table.Column prop={"date"} label={"Date"}></Table.Column>
            <Table.Column prop={"actions"} label={"Actions"}></Table.Column>
        </Table>
    );
}

export default TableEmpty;
