import { FlatList, Modal} from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { CloseButton, Header, Image, IngredientsContainer, ModalBody, Ingredient, Footer, FooterContainer, PriceContainer } from "./style";

type ProductModalProps = {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddToCart: (product: Product)=> void;
}

export function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){
  if (!product){
    return null;
  }

  function handleAddToCart(){
    onAddToCart(product!);
    onClose();
  }

  return(
    <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={onClose}
    >
      <Image
        source={{uri:`http://10.0.2.2:3000/uploados/${product.imagePath}`}}
        >
          <CloseButton onPress={onClose}>
            <Close/>
          </CloseButton>
      </Image>
      <ModalBody>
      <Header>
        <Text size={24} weight="600">{product.name}</Text>
        <Text size={16} weight="400" color="#666" style={{marginTop: 8}}>{product.descritption}</Text>
      </Header>
      {product.ingredients.length > 0 && (
        <IngredientsContainer>
        <Text weight="600" color="#666">Ingredientes</Text>
        <FlatList
          data={product.ingredients}
          keyExtractor={ingredient => ingredient._id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 16}}
          renderItem={({ item: ingredient}) => (
            <Ingredient>
              <Text size={14} color="#666">{ingredient.name}</Text>
            </Ingredient>
          )}
        />
      </IngredientsContainer>
      )}

      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  )
}