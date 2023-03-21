import { Card, CardHeader, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

export class Champions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {champions: {}}
        this.getChampions()
    }
    render() {
        const championCards = Object.entries(this.state.champions).map(([champion, data]) => {
            return <GridItem><Card key={champion}>
                <CardHeader>
                    { champion }
                </CardHeader>
            </Card></GridItem>
        })
        return <Grid templateColumns='repeat(10, 1fr)'>{championCards}</Grid>
    }
    getChampions() {
        console.log("Getting champions")
        fetch("http://localhost:8000/champions?region=oce").then(r => r.json()).then(
            d => this.setState({champions: d["data"]})
        )
        console.log("Got champions: " + JSON.stringify(this.state.champions))
    }
}