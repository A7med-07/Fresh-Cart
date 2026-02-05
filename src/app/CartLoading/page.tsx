import React from 'react'
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export default function CartLoading() {
  return (
      <div className="flex w-full h-screen justify-center items-center">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Please wait while we processing...</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}
