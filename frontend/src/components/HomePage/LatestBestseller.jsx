import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Grid from '@mui/material/Grid2';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage/LatestBestseller.css";
import productApi from '../ProductList/services/products';


const LatestBestseller = () => {
  const [elecIndex, setElecIndex] = useState(0);
  const [fashIndex, setFashIndex] = useState(0);
  const [bestElec, setbestElec] = useState({});
  const [bestFash, setbestFash] = useState({});
  const [latest, setLatest] = useState({});
  const [bestselling, setBestselling] = useState({});
  const [products, setProducts] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const latestRes = await axios.get("/api/v1/public/products/latest");
        setLatest(latestRes.data);
        // const bestsellingRes = await axios.get("/api/v1/public/products/top-selling");
        // setBestselling(bestsellingRes.data);
        // Hard code the data for bestselling
        // const allProducts = await axios.get("/api/v1/public/products/all");
        const allProducts = await productApi.getAll();

        setProducts(allProducts);

        const elecBest = [];
        for (let index = 0; index < 6; index++) {
          elecBest.push(allProducts[index]);
        }
        setbestElec(elecBest);
        const fashBest = [];
        for (let index = 13; index < 19; index++) {
          fashBest.push(allProducts[index]);
        }
        setbestFash(fashBest);


      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);


  const getImage = (data, index) => {
    return data[index]?.imageUrls[0];
  }

  const toProduct = (data, index) => {
    nav("/product/" + data[index]?.id);
  }

  // To change the Bestseller pics around

  const changeElecRight = () => {
    setElecIndex((elecIndex + 1) % 6);
  }

  const changeElecLeft = () => {
    if (elecIndex < 1) {
      setElecIndex(5);
    } else {
      setElecIndex(elecIndex - 1);
    }
  }

  const changeFashRight = () => {
    setFashIndex((fashIndex + 1) % 6);
  }

  const changeFashLeft = () => {
    if (fashIndex < 1) {
      setFashIndex(5);
    } else {
      setFashIndex(fashIndex - 1);
    }
  }

  return (
    <>
      <div className="latest-best-container">
        <div className="latest-bestseller-box">
          <Grid container direction={'row'} spacing={2} wrap="noWrap">
            <Grid size={6}>
              <div className="bestseller">
                <p class="best-label"><b>Best Sellers in Electronics</b></p>

                <div class="best-latest-slider">
                  <div class="bestseller-flex">
                    <button class="left-right" onClick={changeElecLeft}><ArrowLeftIcon /></button>
                    <img src={getImage(bestElec, elecIndex)} onClick={() => toProduct(bestElec, elecIndex)} class="bestseller-pic" />
                    <img src={getImage(bestElec, (elecIndex + 1) % 6)} onClick={() => toProduct(bestElec, (elecIndex + 1) % 6)} class="bestseller-pic" />
                    <img src={getImage(bestElec, (elecIndex + 2) % 6)} onClick={() => toProduct(bestElec, (elecIndex + 2) % 6)} class="bestseller-pic" />

                    <button class="left-right" onClick={changeElecRight}><ArrowRightIcon /></button>
                  </div>
                </div>
              </div>

            </Grid>

            <Grid size={6}>
              <div className="bestseller">
                <p class="best-label"><b>Best Sellers in Fashion</b></p>
                <div class="best-latest-slider">
                  <div class="bestseller-flex">
                    <button class="left-right" onClick={changeFashLeft}><ArrowLeftIcon /></button>
                    <img src={getImage(bestFash, (fashIndex + 3) % 6)} onClick={() => toProduct(bestFash, (fashIndex + 3) % 6)} class="bestseller-pic" />
                    <img src={getImage(bestFash, (fashIndex + 4) % 6)} onClick={() => toProduct(bestFash, (fashIndex + 4) % 6)} class="bestseller-pic" />
                    <img src={getImage(bestFash, (fashIndex + 5) % 6)} onClick={() => toProduct(bestFash, (fashIndex + 5) % 6)} class="bestseller-pic" />
                    <button class="left-right" onClick={changeFashRight}><ArrowRightIcon /></button>
                  </div>
                </div>

              </div>
            </Grid>
          </Grid>

          <Grid container direction={'row'} spacing={2} wrap="noWrap">
            <Grid size={6}>
              <div className="latest">
                <p class="latest-label"><b>Latest in Electronics</b></p>
                <div class="latest-pic-row">
                  <Grid container direction={'row'} spacing={2} wrap="noWrap">
                    <Grid size={6}>
                      <img src={getImage(latest, 0)} onClick={() => toProduct(latest, 0)} class="latest-pic" />
                    </Grid>
                    <Grid size={6}>
                      <img src={getImage(latest, 1)} onClick={() => toProduct(latest, 1)} class="latest-pic" />
                    </Grid>
                  </Grid>
                </div>

                <div class="latest-pic-row">
                  <Grid container direction={'row'} spacing={2} wrap="noWrap">
                    <Grid size={6}>
                      <img src={getImage(latest, 2)} onClick={() => toProduct(latest, 2)} class="latest-pic" />
                    </Grid>
                    <Grid size={6}>
                      <img src={getImage(latest, 3)} onClick={() => toProduct(latest, 3)} class="latest-pic" />
                    </Grid>
                  </Grid>
                </div>
              </div>

            </Grid>

            <Grid size={6}>
              <div className="latest">
                <p class="latest-label"><b>Latest in Fashion</b></p>

                <div class="latest-pic-row">
                  <Grid container direction={'row'} spacing={2} wrap="noWrap">
                    <Grid size={6}>
                      <img src={getImage(latest, 4)} onClick={() => toProduct(latest, 4)} class="latest-pic" />
                    </Grid>
                    <Grid size={6}>
                      <img src={getImage(latest, 5)} onClick={() => toProduct(latest, 5)} class="latest-pic" />
                    </Grid>
                  </Grid>
                </div>

                <div class="latest-pic-row">
                  <Grid container direction={'row'} spacing={2} wrap="noWrap">
                    <Grid size={6}>
                      <img src={getImage(latest, 6)} onClick={() => toProduct(latest, 6)} class="latest-pic" />
                    </Grid>
                    <Grid size={6}>
                      <img src={getImage(latest, 7)} onClick={() => toProduct(latest, 7)} class="latest-pic" />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default LatestBestseller;
