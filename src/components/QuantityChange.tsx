import styles from "@/styles/QuantityChange.module.css";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

type quantityChangeProps = {
    title: string
}

export default function QuantityChange(props: quantityChangeProps){
    const { addToCart } = useContext(UserContext);


    const handleChange = (event: SelectChangeEvent) => {
        addToCart(props.title, event.target.value);
        // setQuantity(event.target.value);
      };

    return(
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={handleChange}
              label="Quantity"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
    );
}