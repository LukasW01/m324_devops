import React from "react";
import Skeleton from "react-loading-skeleton";
import {Table} from "@geist-ui/core";
import '../../css/skeleton.css';


const TableHeadLoading: React.FC = () => {
    return (
        <>
            <Table data={[]}>
                <Table.Column prop={"task"} label={"Task"}></Table.Column>
                <Table.Column prop={"date"} label={"Date"}></Table.Column>
                <Table.Column prop={"actions"} label={"Actions"}></Table.Column>
            </Table>
            <Skeleton count={1} height={"50px"}/>
        </>
    );
}

export default TableHeadLoading;
