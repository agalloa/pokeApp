import { SmallPokemon } from "@/interfaces";

import { Card, Text } from "@nextui-org/react";


export const PokemonCard: React.FC<SmallPokemon> = ({ name, img }) => (
  <Card isHoverable variant="bordered">
    <Card.Body>
      <Card.Image src={img} alt={name} width="100%" height={300} />
    </Card.Body>
    <Card.Footer css={{ background: "$accents7", justifyContent: "center" }}>
      <Text b h3>
        {name}
      </Text>
    </Card.Footer>
  </Card>
);
