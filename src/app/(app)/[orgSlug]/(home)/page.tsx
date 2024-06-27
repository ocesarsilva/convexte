import { formatPrice } from "@/lib/utils"
import { PageHeader } from "@/components/layout/page-header"
import { Wrapper } from "@/components/wrapper"

import { OverviewCard } from "./_components/overview-card"

export default function Page() {
  return (
    <>
      <PageHeader title="Home" />

      <Wrapper>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total de leads"
            value={"2330"}
            description="Total de leads em seu banco de dados"
            icon="users"
          />
          <OverviewCard
            title="Leads convertidos"
            value={"3000"}
            description="Total de leads convertidos"
            icon="repeat"
          />
          <OverviewCard
            title="Leads perdidos"
            value={"200"}
            description="Total de leads perdidos"
            icon="chevronsDown"
          />
          <OverviewCard
            title="Total vendido"
            value={formatPrice(3454)}
            description="Receita total da suas vendas"
            icon="dollarSign"
          />
        </div>
      </Wrapper>
    </>
  )
}
