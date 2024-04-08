"use client";
import { useEffect, useState } from "react";
import BarChart from "@/components/ui/BarChart";
import { getPokemon } from "@/lib/pokemonAPI";
import RadarChart from "@/components/ui/RadarChart";

interface GameIndex {
  game_index: number;
}

interface Generation {
  name: string;
}
export default function PokemonPage({ params }: { params: { name: string } }) {
  const [details, setDetails] = useState(null);
  const { name } = params;
  const [pokemonObject, setpokemonObject] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await getPokemon(name);
        setpokemonObject(res);
        console.log(res.items);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemonData();
  }, [name]);

  const handleDetails = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold pt-4 mb-5">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <div className="flex gap-5">
        {pokemonObject &&
          (pokemonObject as any).items.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white px-4 py-3 text-black rounded-md mb-3 cursor-pointer"
              onClick={() => handleDetails(item.url)}

            >
              <p >{item.name}</p>
            </div>
          ))}
      </div>
      {details && (
        <>
          <h1 className="text-4xl font-bold pt-4 mb-5">
            {details && (details as any).name}
          </h1>
          <table>
            <tr>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Attributes</h2>
                <ul>
                  {details &&
                    (details as any).attributes.map((item: any) => (
                      <li key={item.url}>
                        <a href={item.url}>{item.name}</a>
                      </li>
                    ))}
                </ul>
              </td>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Category</h2>
                <p>{details && (details as any).category.name}</p>
              </td>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Cost</h2>
                <p>{details && (details as any).cost}</p>
              </td>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Effect Entries</h2>
                {details &&
                  (details as any).effect_entries?.map(
                    (entry: any, index: number) => (
                      <div key={index}>
                        <p >
                          <span className="font-bold"> Language: </span>{entry.language.name}
                        </p>
                        <p><span className="font-bold"> Effect: </span> {entry.effect}</p>
                        <p><span className="font-bold"> Short Effect: </span> {entry.short_effect}</p>
                      </div>
                    )
                  )}
              </td>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Flavor Text Entries</h2>
                {details &&
                  (details as any).flavor_text_entries.splice(0,6)?.map(
                    (entry: any, index: number) => (
                      <div key={index}>
                        <p className="font-bold">
                           {entry.version_group.name}
                        </p>
                      </div>
                    )
                  )}
              </td>
              <td className="table-cell">
                <h2 className="text-lg font-bold mb-2">Sprites</h2>
                {details && (
                  <img
                    src={details && (details as any).sprites.default}
                    alt="Sprite"
                  />
                )}
              </td>
            </tr>
          </table>
          <div className="row flex gap-4 mt-12">
            <div > {details && <BarChart data={details} />}</div>
            <div >{details && <RadarChart data={details} />}</div>
          </div>
        </>
      )}
      {!details && <p>Click on any pokemon to view details</p>}
    </>
  );
}
