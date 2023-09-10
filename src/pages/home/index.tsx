import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedMarket: string;
  formatedPrice: string;
}
interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  useEffect(() => {
    async function getDatas() {
      await fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=18624280c23f871b&pref"
      )
        .then((response) => response.json())
        .then((result: DataProps) => {
          const coinsDatas = result.coins.slice(0, 15);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsDatas.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };
            return formated;
          });
          formatResult.sort((a, b) => {
            const marketA = Number(a.formatedMarket.replace(/\D/g, ""));
            const marketB = Number(b.formatedMarket.replace(/\D/g, ""));

            return marketB - marketA;
          });

          setCoins(formatResult);
        })

        .catch((error) => {
          console.error(error);
        });
    }

    getDatas();
  }, []);
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder="Digite o simbolo da moeda: BTC..." />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((item) => {
            const volume24h = parseFloat(item.volume_24h);

            return (
              <tr className={styles.tr} key={item.symbol}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <Link className={styles.link} to={"/detail/" + item.symbol}>
                    <span>{item.name}</span> | {item.symbol}
                  </Link>
                </td>
                <td data-label="Mercado" className={styles.tdLabel}>
                  {item.formatedMarket}
                </td>
                <td data-label="Preço" className={styles.tdLabel}>
                  {item.formatedPrice}
                </td>
                {volume24h >= 0 ? (
                  <td data-label="Volume" className={styles.tdProfit}>
                    <span>+{volume24h.toFixed(2)}</span>
                  </td>
                ) : (
                  <td data-label="Volume" className={styles.tdLoss}>
                    <span>{volume24h.toFixed(2)}</span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
