<template>
  <div class="order-table-container">
    <!-- 标题 -->
    <div v-if="title" class="table-header">
      <h4>{{ title }}</h4>
      <div v-if="pagination && pagination.total > 0" class="total-info">
        共 {{ pagination.total }} 条记录
      </div>
    </div>

    <!-- 订单表格 -->
    <div v-if="tableData && tableData.length > 0" class="table-wrapper">
      <el-table
        :data="tableData"
        stripe
        size="mini"
        style="width: 100%"
        :max-height="maxHeight"
        :show-header="showHeader"
      >
        <el-table-column prop="number" label="订单号" width="150" />

        <el-table-column label="订单菜品" show-overflow-tooltip min-width="200">
          <template slot-scope="scope">
            <div class="order-dishes">
              {{ scope.row.orderDishes || '-' }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="consignee" label="客户" width="100" />

        <el-table-column prop="phone" label="手机号" width="120" />

        <el-table-column label="地址" show-overflow-tooltip min-width="200">
          <template slot-scope="scope">
            <div class="address">
              {{ scope.row.address || '-' }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="amount" label="金额" width="90" align="right">
          <template slot-scope="{ row }">
            <span class="amount">
              ￥{{ row.amount ? (row.amount.toFixed(2) * 100) / 100 : '0.00' }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="{ row }">
            <el-tag
              :type="getStatusType(row.status)"
              size="mini"
            >
              {{ getOrderStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          v-if="showOperations"
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            <!-- 根据订单状态显示不同操作按钮 -->
            <div v-if="row.status === 2" class="operation-buttons">
              <el-button
                type="text"
                size="mini"
                class="accept-btn"
                @click="handleAccept(row)"
              >
                接单
              </el-button>
              <el-button
                type="text"
                size="mini"
                class="reject-btn"
                @click="handleReject(row)"
              >
                拒单
              </el-button>
            </div>
            <el-button
              type="text"
              size="mini"
              @click="handleViewDetail(row)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <i class="el-icon-document" />
      <p>暂无订单数据</p>
    </div>

    <!-- 分页信息 -->
    <div v-if="pagination && pagination.total > 0 && showPagination" class="pagination-info">
      <span>
        第 {{ pagination.current || 1 }} 页，共 {{ Math.ceil(pagination.total / (pagination.pageSize || 10)) }} 页
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'OrderTable'
})
export default class OrderTable extends Vue {
  @Prop({ default: () => [] }) tableData!: any[]
  @Prop({ default: '' }) title!: string
  @Prop({ default: null }) pagination!: any
  @Prop({ default: true }) showHeader!: boolean
  @Prop({ default: false }) showOperations!: boolean
  @Prop({ default: true }) showPagination!: boolean
  @Prop({ default: 300 }) maxHeight!: number

  // 获取订单状态文本
  private getOrderStatusText(status: number): string {
    const statusMap: { [key: number]: string } = {
      1: '待付款',
      2: '待接单',
      3: '待派送',
      4: '派送中',
      5: '已完成',
      6: '已取消'
    }
    return statusMap[status] || '未知'
  }

  // 获取状态标签类型
  private getStatusType(status: number): string {
    const typeMap: { [key: number]: string } = {
      1: 'warning',
      2: 'primary',
      3: 'info',
      4: 'warning',
      5: 'success',
      6: 'danger'
    }
    return typeMap[status] || 'info'
  }

  // 处理查看详情
  private handleViewDetail(row: any) {
    this.$emit('view-detail', row)
  }

  // 处理接单
  private handleAccept(row: any) {
    this.$emit('accept-order', row)
  }

  // 处理拒单
  private handleReject(row: any) {
    this.$emit('reject-order', row)
  }
}
</script>

<style lang="scss" scoped>
.order-table-container {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  width: 100%;
  min-width: 800px;

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e4e7ed;

    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #606266;
    }

    .total-info {
      font-size: 12px;
      color: #909399;
    }
  }

  .table-wrapper {
    .el-table {
      font-size: 12px;

      ::v-deep .el-table__header-wrapper {
        .el-table__header {
          th {
            background: #fafafa;
            color: #606266;
            font-weight: 600;
            font-size: 12px;
          }
        }
      }

      ::v-deep .el-table__body-wrapper {
        .el-table__body {
          td {
            padding: 8px 0;
            font-size: 12px;
          }
        }
      }
    }

    .order-dishes,
    .address {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .amount {
      font-weight: 600;
      color: #e6a23c;
    }

    .operation-buttons {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;

      .accept-btn {
        color: #67c23a;
        &:hover {
          color: #529b2e;
        }
      }

      .reject-btn {
        color: #f56c6c;
        &:hover {
          color: #dd6161;
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #909399;

    i {
      font-size: 32px;
      margin-bottom: 8px;
      display: block;
    }

    p {
      margin: 0;
      font-size: 14px;
    }
  }

  .pagination-info {
    padding: 8px 16px;
    background: #f8f9fa;
    border-top: 1px solid #e4e7ed;
    font-size: 12px;
    color: #909399;
    text-align: right;
  }
}
</style>
