import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Slider,
    Typography,
    makeStyles,
    Grid,
    Switch,
    FormControlLabel,
    TableContainer,
    TableRow,
    Table,
    TableCell,
    TableBody,
    Paper,
    TableHead,
    MuiThemeProvider,
    createTheme
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import React, { useState } from 'react';
import { contentClasses } from '../../styles/'
import { BsTrash } from 'react-icons/bs';



const useStyles = makeStyles({
    customButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    }
});

const Calculator = (props) => {
    const classes = useStyles();
    const redTheme = createTheme({ palette: { primary: {main: '#E65B65'} } })
    const [amountMl, setAmountMl] = useState(0);
    const [nicotineTarget, setNicotineTarget] = useState(0);
    const [baseVg, setBaseVg] = useState(70);
    const [basePg, setBasePg] = useState(30);
    const [nicotineStrength, setNicotineStrength] = useState(0);
    const [nicotineIsPg, setNicotineIsPg] = useState(true);
    const [flavors, setFlavors] = useState([{ id: 1, flavor: 'Flavor1', amount: 0 }]);
    const [flavorCounter, setFlavorCounter] = useState(1);
    const [recipe, setRecipe] = useState([{ flavor: '', amount: 0, g: 0, ml: 0 }]);
    const vgWeight = 1.16;
    const pgWeight = 1.05;

    const handChangeNicotine = (value, type) => {
        if (type === 'vg') {
            let vg = value;
            let pg = 100 - value;
            setBaseVg(vg);
            setBasePg(pg);
        }
        else {
            let pg = value;
            let vg = 100 - value;
            setBaseVg(vg);
            setBasePg(pg);
        }
    }

    const handleCalculate = () =>{
        var totalPG = amountMl * (basePg/100);
        var totalVG = amountMl * (baseVg/100);

        var auxRecipe = [];
        var nicotineBaseName = nicotineIsPg? "PG":"VG";

        auxRecipe.push({ 
            flavor: "Nicotine base (" + nicotineBaseName + ")", 
            amount: 0, 
            g: parseFloat(0).toFixed(2),
            ml: parseFloat(0).toFixed(2)
        });

        if(flavors.length > 0 && amountMl > 0){
            flavors.map(f => {
                auxRecipe.push({ 
                    flavor: f.flavor, 
                    amount: f.amount, 
                    g: parseFloat(f.amount*1.05).toFixed(2),
                    ml: parseFloat(f.amount * (amountMl/100)).toFixed(2)
                });
                //totalPG = totalPg - (f.amount * (amountMl/100));
            })
        }
        
        auxRecipe.push({ 
            flavor: "PG", 
            amount: basePg, 
            g: parseFloat((amountMl * (basePg/100))*pgWeight).toFixed(2),
            ml: parseFloat(amountMl * (basePg/100) * (amountMl/100)).toFixed(2)
        });
        auxRecipe.push({ 
            flavor: "VG", 
            amount: baseVg, 
            g: parseFloat(amountMl * (baseVg/100)*vgWeight).toFixed(2),
            ml: parseFloat(amountMl * (baseVg/100) * (amountMl/100)).toFixed(2)
        });

        auxRecipe.push({ 
            flavor: <Box fontWeight="fontWeightBold">SUM</Box>, 
            amount: <Box fontWeight="fontWeightBold">0</Box>, 
            g: <Box fontWeight="fontWeightBold">0</Box>, 
            ml: <Box fontWeight="fontWeightBold">0</Box>, 
        });

        setRecipe(auxRecipe);
    }

    return (
        <>
            <Box mt={2}>
                <Grid>
                    <Grid item sm={4}>
                        <Box m={2}>
                            <Alert icon={false} severity="info">Juice Properties</Alert>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <TextField
                                        label="Amount of Juice"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={amountMl}
                                        onChange={e => {
                                            setAmountMl(e.target.value);
                                            handleCalculate();
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">ml</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Nicotine Target"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={nicotineTarget}
                                        onChange={e => {
                                            setNicotineTarget(e.target.value);
                                            handleCalculate();
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">mg/ml</InputAdornment>
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography id="discrete-slider" gutterBottom>
                                VG/PG Ratio: {baseVg} / {basePg}
                            </Typography>
                            <Slider
                                defaultValue={baseVg}
                                value={baseVg}
                                onChange={(e, val) => {
                                    handChangeNicotine(val, 'vg')
                                    handleCalculate();
                                }}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                            />
                            <Slider
                                defaultValue={basePg}
                                value={basePg}
                                onChange={(e, val) => {
                                    handChangeNicotine(val, 'pg')
                                    handleCalculate();
                                }}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                            />
                        </Box>

                        <Box m={2} mt={1}>
                            <Alert icon={false} severity="warning">Nicotine base</Alert>
                            <TextField
                                label="Nicotine Strength"
                                type="number"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={nicotineStrength}
                                onChange={e => {
                                    setNicotineStrength(e.target.value)
                                    handleCalculate();
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mg/ml</InputAdornment>
                                }}

                            />
                            <FormControlLabel

                                control={
                                    <Switch
                                        checked={nicotineIsPg}
                                        onChange={e => {
                                            setNicotineIsPg(!nicotineIsPg)
                                            handleCalculate();
                                        }}
                                        color="primary"
                                    />
                                }
                                label={nicotineIsPg ? "Select nicotine base: PG" : "Select nicotine base: VG"}
                                labelPlacement="start"
                            />



                        </Box>
                    </Grid>

                    <Grid item sm={4}>
                        <Box m={2}>
                            <Alert icon={false} severity="success">
                                Flavoring
                            </Alert>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Flavor</TableCell>
                                            <TableCell>(%)</TableCell>
                                            <TableCell align="center">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {flavors.map((row, i) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    <TextField
                                                        size="small"
                                                        value={row.flavor}
                                                        onChange={e => {
                                                            flavors[i].flavor = e.target.value;
                                                            setFlavors( [...flavors] )
                                                            handleCalculate()
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <TextField
                                                        size="small"
                                                        value={row.amount}
                                                        type="number"
                                                        onChange={e => {
                                                            flavors[i].amount = e.target.value;
                                                            setFlavors( [...flavors] )
                                                            handleCalculate()
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell align="center">
                                                    <MuiThemeProvider theme={redTheme}>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                console.log(row.id);
                                                                //flavors.splice(row.id, 1);
                                                                flavors.splice(flavors.findIndex(function (r) {
                                                                    return r.id === row.id;
                                                                }), 1);
                                                                setFlavors([...flavors]);
                                                                handleCalculate()
                                                            }}
                                                        >
                                                            <BsTrash />
                                                        </Button>
                                                    </MuiThemeProvider>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box mt={1} display="flex" flexDirection="row-reverse">
                                <Button

                                    size="small"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => {

                                        setFlavors([...flavors, { id: flavorCounter + 1, flavor: 'Flavor' + (flavorCounter + 1), amount: 0 }]);
                                        setFlavorCounter(flavorCounter + 1);
                                        handleCalculate();
                                    }}>
                                    + Add
                                </Button>
                            </Box>



                        </Box>
                    </Grid>

                    <Grid item sm={4}>
                        <Box m={2} mt={6}>
                            <Alert icon={false} variant="filled" severity="info">
                                Recipe
                            </Alert>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Flavor</TableCell>
                                            <TableCell>(%)</TableCell>
                                            <TableCell>(g)</TableCell>
                                            <TableCell>(ml)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recipe.map((row, i) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">{row.flavor}</TableCell>
                                                <TableCell component="th" scope="row">{row.amount}</TableCell>
                                                <TableCell component="th" scope="row">{row.g}</TableCell>
                                                <TableCell component="th" scope="row">{row.ml}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>



            </Box>

        </>
    );
}

export default Calculator;